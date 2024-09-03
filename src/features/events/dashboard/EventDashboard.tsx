import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
//import { sampleData } from "../../../app/api/sampleData";
//import { useEffect, useState } from "react";
//import { AppEvent } from "../../../app/types/event";
import { useAppSelector } from "../../../app/store/store";

export default function EventDashboard() {
  // const [events, setEvents] = useState<AppEvent[]>([]);

  // useEffect(() => {
  //   setEvents(sampleData);
  // }, [])
  const {events} = useAppSelector(state => state.events)

  return (
    <Grid>
      <Grid.Column widescreen={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
         <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  )
}
