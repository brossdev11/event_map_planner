import React, { useEffect, useRef, useState } from "react";
import Button from "../components/common/Button";
import { store } from "react-notifications-component";
import { useCurrentUser } from "../lib/hooks";

import { HiLocationMarker } from 'react-icons/hi';
import GooglePlacesAutocomplete, {
    geocodeByPlaceId,
  } from "react-google-places-autocomplete";
import axios from "axios";
import { useRouter } from "next/router";


const EventInfo = ({ event }) => {
  const [user] = useCurrentUser();
  const router = useRouter();
  const nameRef = useRef();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if(event) {
        setLocation({
            lat: event.lat,
            lng: event.lng,
            country: event.country,
            city: event.city,
            description: event.description,
        });
    }
  }, [event])

  const handleChangeName = () => {
      if(nameRef.current.value === '') {
        store.addNotification({
          title: '',
          message: 'Please input event name',
          type: 'danger',
          insert: "top",
          container: "top-center",
          dismiss: {
            duration: 4000,
          },
        });
      } else {
          axios.put('/api/event', { id: event._id, name: nameRef.current.value }).then(() => {
            store.addNotification({
                title: '',
                message: 'Event successfully updated!',
                type: 'success',
                insert: "top",
                container: "top-center",
                dismiss: {
                duration: 4000,
                },
            });
            window.location.reload();
          })
      }
  }

  const handleChangeLocation = () => {
      if(location.description === '' | !location.lat | !location.lng) {
        store.addNotification({
          title: '',
          message: 'Please choose correct location',
          type: 'danger',
          insert: "top",
          container: "top-center",
          dismiss: {
            duration: 4000,
          },
        });
      } else {
          axios.put('/api/event', { id: event._id, ...location }).then(() => {
            store.addNotification({
                title: '',
                message: 'Event successfully updated!',
                type: 'success',
                insert: "top",
                container: "top-center",
                dismiss: {
                duration: 4000,
                },
            });
            window.location.reload();
          })
      }
  }

  const selectLocation = (e) => {
    let t_location = {};
    geocodeByPlaceId(e.place_id).then(([results]) => {
      const country =
        results.address_components.find((c) => c.types.includes("country")) ||
        {};
      const city =
        results.address_components.find(
          (c) => c.types.includes("locality") || c.types.includes("postal_town")
        ) || {};
      t_location = {
        lat: results.geometry.location.lat(),
        lng: results.geometry.location.lng(),
        country: country?.long_name,
        city: city?.long_name,
        description: e.description,
      }
      setLocation(t_location);
    })
  }

  return (
    <div className="w-full pt-20 pl-40 mx-auto text-gray-400">
      <div className="w-[550px]">
        <div className="w-full mb-5">
          <label htmlFor="name" className="font-bold text-xl text-gray-400">
            Name
          </label>
          <div className="w-full flex items-center mt-2">
            <input id="name" type="text" ref={nameRef} defaultValue={event.name} className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="name" required/>
            <Button
              type="button"
              style="primary"
              className="ml-14"
              onClick={() => handleChangeName()}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="w-full mb-5">
          <label htmlFor="location" className="font-bold text-xl text-gray-400">
            Location
          </label>
          <div className="w-full flex items-start mt-2">
              <div className="w-full">
                    <GooglePlacesAutocomplete
                        onSelect={(e) => {
                            selectLocation(e);
                        }}
                        autocompletionRequest={{}}
                        searchOptions={{ types: ["locality"] }}
                        initialValue={location?.description}
                        renderInput={(inputProps) => (
                            <input {...inputProps} className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" onChange={(e) => {inputProps.onChange(e)}}/>
                        )}
                        renderSuggestions={(active, suggestions, onSelectSuggestion) => (
                        <>
                            {suggestions.length > 0 && (
                                <>
                                    <div variant="outlined" className="bg-white py-5" >
                                        {suggestions.map((suggestion) => (
                                            <div
                                            key={suggestion.place_id}
                                            className="px-5 py-2 text-base font-medium flex items-start"
                                            onClick={(event) => onSelectSuggestion(suggestion, event)}
                                            >
                                            <HiLocationMarker className="w-7 h-7 mr-2" />
                                            <div className="flex-1">{suggestion.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                        )}
                    />
              </div>
            <Button
              type="button"
              style="primary"
              className="ml-14"
              onClick={() => handleChangeLocation()}
            >
              Change
            </Button>
          </div>
        </div>
        <div className="w-full flex items-center mt-20">
          <div className="font-bold text-xl text-gray-400 mr-10">Go to planner</div>
          <Button
            type="button"
            style="primary"
            onClick={() => router.replace(`${router.asPath}/map`)}
          >
            Planner
          </Button>
        </div>
      </div>
    </div>
  );
};
export default EventInfo;
