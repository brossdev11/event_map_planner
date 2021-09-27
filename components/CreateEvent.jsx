import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { HiLocationMarker } from 'react-icons/hi';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { store } from "react-notifications-component";
import Button from "../components/common/Button";
import { useCurrentUser } from "../lib/hooks";
import axios from "axios";

const CreateEvent = () => {
  const [user] = useCurrentUser();
  const nameRef = useRef();
  const [location, setLocation] = useState(null);
  const router = useRouter();

  useEffect(() => {
      if(!user) {
            router.replace('/login');
      }
  }, [user]);

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

  const create = () => {
    let name = nameRef.current.value;
    let error = false;
    let errorMessage = '';
    if(name === '') {
      error = true;
      errorMessage = 'Please input event name';
    } else if(location.description === '' | !location.lat | !location.lng) {
      error = true;
      errorMessage = 'Please choose correct location';
    }
    if(error) {
      store.addNotification({
        title: '',
        message: errorMessage,
        type: 'danger',
        insert: "top",
        container: "top-center",
        dismiss: {
          duration: 4000,
        },
      });
    } else {
      axios.post('/api/event', { name, ...location}).then(() => {
        store.addNotification({
          title: '',
          message: 'Event successfully added!',
          type: 'success',
          insert: "top",
          container: "top-center",
          dismiss: {
            duration: 4000,
          },
        });
      })
    }
  }

  return (
    <div className="w-full pt-20 pl-40 mx-auto text-gray-400">
      <div className="w-full text-gray-400 text-[40px] font-bold mb-20">
        Create Event
      </div>
      <div className="w-[550px]">
        <div className="w-full mb-5">
          <label htmlFor="name" className="font-bold text-xl text-gray-400">
            Name
          </label>
          <input id="name" type="text" ref={nameRef} className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" name="name" required/>
        </div>
        <div className="w-full mb-5">
          <label htmlFor="location" className="font-bold text-xl text-gray-400">
            Location
          </label>
          <GooglePlacesAutocomplete
            onSelect={(e) => {
              selectLocation(e);
            }}
            autocompletionRequest={{}}
            searchOptions={{ types: ["locality"] }}
            renderInput={(inputProps) => (
                <input {...inputProps} className="w-full bg-white rounded-full h-12 outline-none px-5 text-lg" onChange={(e) => {inputProps.onChange(e)}}/>
            )}
            renderSuggestions={(active, suggestions, onSelectSuggestion) => (
              <>
                {suggestions.length > 0 && (
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
                )}
              </>
            )}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="button"
            style="primary"
            className="mx-auto"
            onClick={() => create()}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateEvent;
