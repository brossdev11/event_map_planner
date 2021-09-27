import React from 'react';
import { getEventInfo } from '../../../lib/db';
import middleware from '../../../middlewares/middleware';
import Header from '../../../components/Layout/Header';
import MainLayout from '../../../components/Layout/MainLayout';
import EventInfo from '../../../components/EventInfo';

export default function EventInfoWrapper({event}) {

    if (!event) return <Error statusCode={404} />;
    return (
        <div className="w-full min-h-screen">
            <Header />
            <MainLayout>
                <EventInfo event={event} />
            </MainLayout>
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