import React from 'react';
import { getEventInfo } from '../../../lib/db';
import middleware from '../../../middlewares/middleware';
import EventMapHeader from '../../../components/Layout/EventMapHeader';
import EventMap from '../../../components/EventMap';

export default function EventInfoWrapper({event}) {

    if (!event) return <Error statusCode={404} />;
    return (
        <div className="w-full min-h-screen text-[#868686]">
            <EventMapHeader event={event} />
            <EventMap event={event} />
        </div>
    );
}
export async function getServerSideProps(context) {
    await middleware.apply(context.req, context.res);
    const event = await getEventInfo(context.req, context.params.eventId);
    if (!event) context.res.statusCode = 404;
    return {
        props: {
            event,
        },
    };
}