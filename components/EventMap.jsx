import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../lib/hooks";
import ToolBar from "./EventMap/Toolbar";
import ToolContainer from "./EventMap/Tools";
import Zones from "./EventMap/Tools/Zone";
import Personnel from "./EventMap/Tools/Personnel";

const EventMap = ({ event }) => {
  const [user] = useCurrentUser();
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [drawingManager, setDrawingManager] = useState(null);
  var selectedShape;
  const [zoneData, setZoneData] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  const clearSelection = () => {
    if (selectedShape) {
      if (selectedShape.type !== "marker") {
        selectedShape.setEditable(false);
      }

      selectedShape = null;
    }
  };

  const setSelection = (shape) => {
    if (shape.type !== "marker") {
      clearSelection();
      shape.setEditable(true);
      selectColor(shape.get("fillColor") || shape.get("strokeColor"));
    }

    selectedShape = shape;
  };

  const deleteSelectedShape = () => {
    if (selectedShape) {
      selectedShape.setMap(null);
    }
  };

  const selectOption = () => {
    if (selectedShape) {
      selectedShape.setMap(null);
    }
  };

  const selectColor = (color) => {
    // Retrieves the current options from the drawing manager and replaces the
    // stroke or fill color as appropriate.
    if (drawingManager) {
      var polylineOptions = drawingManager.get("polylineOptions");
      polylineOptions.strokeColor = color;
      polylineOptions.fillColor = "red";
      drawingManager.set("polylineOptions", polylineOptions);

      var rectangleOptions = drawingManager.get("rectangleOptions");
      rectangleOptions.fillColor = color;
      drawingManager.set("rectangleOptions", rectangleOptions);

      var circleOptions = drawingManager.get("circleOptions");
      circleOptions.fillColor = color;
      drawingManager.set("circleOptions", circleOptions);

      var polygonOptions = drawingManager.get("polygonOptions");
      polygonOptions.fillColor = color;
      polylineOptions.strokeColor = "red";
      drawingManager.set("polygonOptions", polygonOptions);
    }
  };

  const setSelectedShapeColor = (color) => {
    if (selectedShape) {
      if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
        selectedShape.set("strokeColor", color);
      } else {
        selectedShape.set("fillColor", color);
      }
    }
  };

  const initialize = () => {
    var map = new google.maps.Map(document.getElementById("map-container"), {
      zoom: 16,
      center: new google.maps.LatLng(52.25097, 20.97114),
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      disableDefaultUI: true,
      zoomControl: true,
    });
    // var map = new google.maps.Map(element, {
    //   center: new google.maps.LatLng(-37.8136, 144.9631),
    //   zoom: 11,
    //   mapTypeId: "OSM",
    //   // mapTypeControlOptions: {
    //   //   mapTypeIds: mapTypeIds
    //   // }
    // });

    // map.mapTypes.set("OSM", new google.maps.ImageMapType({
    //   getTileUrl: function(coord, zoom) {
    //     // See above example if you need smooth wrapping at 180th meridian
    //     return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
    //   },
    //   tileSize: new google.maps.Size(256, 256),
    //   name: "OpenStreetMap",
    //   maxZoom: 18
    // }));

    var polyOptions = {
      strokeWeight: 0,
      fillOpacity: 0.45,
      editable: true,
      draggable: true,
    };
    const triangleCoords = [
      { lat: 52.25483195418816, lng: 20.970506998672494 },
      { lat: 52.25481881885945, lng: 20.976450773849496 },
      { lat: 52.25124586502115, lng: 20.97610745109559 },
      { lat: 52.25103568230351, lng: 20.969240996017465 },
    ];
    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      draggable:true,
      // editable:true,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
  
    bermudaTriangle.setMap(map);  
    google.maps.event.addListener(bermudaTriangle, "click", function (e) {
      if (e.vertex !== undefined) {
        if (bermudaTriangle.type === google.maps.drawing.OverlayType.POLYGON) {
          var path = bermudaTriangle.getPaths().getAt(e.path);
          path.removeAt(e.vertex);
          if (path.length < 3) {
            bermudaTriangle.setMap(null);
          }
        }
      }
      setSelection(bermudaTriangle);
    });
    google.maps.event.addListener(bermudaTriangle.getPath(), 'set_at', function() {
      getPolygonOption(bermudaTriangle);
    });

    google.maps.event.addListener(bermudaTriangle.getPath(), 'insert_at', function() {
      getPolygonOption(bermudaTriangle);
    });

    // google.maps.event.addListener(bermudaTriangle, 'click', function(){

    // }) 
    google.maps.event.addDomListener(bermudaTriangle, 'dragend', function() {
      getPolygonOption(bermudaTriangle);
    })
    // Creates a drawing manager attached to the map that allows the user to draw
    // markers, lines, and shapes.
    let tmpDrawingManger = new google.maps.drawing.DrawingManager({
      // drawingMode: google.maps.drawing.OverlayType.POLYGON,
      markerOptions: {
        draggable: true,
      },
      polylineOptions: {
        editable: true,
        draggable: true,
      },
      rectangleOptions: polyOptions,
      circleOptions: polyOptions,
      polygonOptions: {
        // strokeWeight: 0,
        fillOpacity: 0.45,
        fillColor: "red",
        strokeColor: "blue",
        editable: true,
        draggable: true,
      },
      map: map,
    });

    google.maps.event.addListener(
      tmpDrawingManger,
      "overlaycomplete",
      function (e) {
        var newShape = e.overlay;

        newShape.type = e.type;

        if(e.type === google.maps.drawing.OverlayType.POLYGON) {
          var polygonOptions = drawingManager.get("polygonOptions");
          let polygonData = {
            fillColor: polygonOptions.fillColor,
            strokeColor: polygonOptions.strokeColor,
            strokeWeight: polygonOptions.strokeWeight,
            path: [],
          }
          if(e.type === google.maps.drawing.OverlayType.POLYGON) {
            const vertices = newShape.getPath();
            // setZoneData([...zoneData, newShape]);
            for (let i = 0; i < vertices.getLength(); i++) {
              const xy = vertices.getAt(i);
              polygonData.path.push({ lat: xy.lat(), lng: xy.lng()});
            }
          }
          console.log(polygonData);
        }

        if (e.type !== google.maps.drawing.OverlayType.MARKER) {
          // Switch back to non-drawing mode after drawing a shape.
          tmpDrawingManger.setDrawingMode(null);

          // Add an event listener that selects the newly-drawn shape when the user
          // mouses down on it.
          google.maps.event.addListener(newShape, "click", function (e) {
            if (e.vertex !== undefined) {
              if (newShape.type === google.maps.drawing.OverlayType.POLYGON) {
                var path = newShape.getPaths().getAt(e.path);
                path.removeAt(e.vertex);
                if (path.length < 3) {
                  newShape.setMap(null);
                }
              }
            }
            setSelection(newShape);
          });
          setSelection(newShape);
        } else {
          google.maps.event.addListener(newShape, "click", function (e) {
            setSelection(newShape);
          });
          
          setSelection(newShape);
        }
      }
    );

    // Clear the current selection when the drawing mode is changed, or when thew
    // map is clicked.
    google.maps.event.addListener(
      tmpDrawingManger,
      "drawingmode_changed",
      clearSelection
    );
    google.maps.event.addListener(map, "click", clearSelection);
    google.maps.event.addDomListener(
      document.getElementById("delete-button"),
      "click",
      deleteSelectedShape
    );

    setDrawingManager(tmpDrawingManger);
  };

  const selectDrawingType = (value) => {
    switch (value.type) {
      case "polygon": {
        var polygonOptions = drawingManager.get("polygonOptions");
        polygonOptions.fillColor = value.color.slice(0, 7) + "80";
        polygonOptions.strokeColor = value.color;
        drawingManager.set("polygonOptions", polygonOptions);
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
        break;
      }
      case "personnel": {
        var markerOptions = drawingManager.get("markerOptions");
        markerOptions.icon = (
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: value.color }}
          ></div>
        );
        drawingManager.set("polygonOptions", markerOptions);
        drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
        break;
      }
      default: {
        return;
      }
    }
  };

  const getPolygonOption = (shape) => {
    if(drawingManager) {
      var polygonOptions = drawingManager.get("polygonOptions");
      let polygonData = {
        fillColor: polygonOptions.fillColor,
        strokeColor: polygonOptions.strokeColor,
        strokeWeight: polygonOptions.strokeWeight,
        path: [],
      }
      const vertices = shape.getPath();
      // setZoneData([...zoneData, newShape]);
      for (let i = 0; i < vertices.getLength(); i++) {
        const xy = vertices.getAt(i);
        polygonData.path.push({ lat: xy.lat(), lng: xy.lng()});
      }
      console.log(polygonData);
    }
  }

  const tools = {
    Zones: <Zones submit={selectDrawingType} />,
    Personnel: <Personnel submit={selectDrawingType} />,
  };

  return (
    <div className="w-full mx-auto text-gray-400 text-xs relative h-[calc(100vh-69px)]">
      <ToolBar
        selectTool={(e) => {
          setSelectedTool(e);
          setToolbarVisible(true);
        }}
        selectedTool={selectedTool}
      />
      <ToolContainer
        children={tools[selectedTool]}
        visible={toolbarVisible}
        closeToolbar={() => {
          setToolbarVisible(false);
          setSelectedTool(null)
        }}
      />
      <div className="w-full h-full" id="map-container"></div>
    </div>
  );
};
export default EventMap;
