import { useLazyLoadQuery } from "react-relay/hooks";
import { graphql } from "relay-runtime";
import { type Visit, visitToText } from "@diamondlightsource/sci-react-ui";
import type { InstrumentSessionQuery as InstrumentSessionQueryType } from "./__generated__/InstrumentSessionQuery.graphql";
import { useInstrumentSession } from "../context/instrumentSession/useInstrumentSession";
import { TextField } from "@mui/material";

const instrumentSessionQuery = graphql`
  query InstrumentSessionQuery($instrumentName: String!) {
    instrument(instrumentName: $instrumentName) {
      instrumentSessions {
        instrumentSessionId
        instrumentSessionNumber
        startTime
        endTime
        state
        proposal {
          proposalCategory
          proposalNumber
          title
          summary
        }
      }
    }
  }
`;

function InstrumentSessionView() {
  const { instrumentSession, setInstrumentSession } = useInstrumentSession();

  const data = useLazyLoadQuery<InstrumentSessionQueryType>(
    instrumentSessionQuery,
    { instrumentName: "ViSR" },
  );

  const sessionListLen = data.instrument?.instrumentSessions.length ?? 1;

  const visit: Visit = {
    proposalCode:
      data.instrument?.instrumentSessions[sessionListLen - 1].proposal
        ?.proposalCategory ?? "cm",
    proposalNumber:
      data.instrument?.instrumentSessions[sessionListLen - 1].proposal
        ?.proposalNumber ?? 40661,
    number:
      data.instrument?.instrumentSessions[sessionListLen - 1]
        .instrumentSessionNumber ?? 6,
  };

  const visitText = visitToText(visit);

  const STORAGE_KEY = "instrument-session-id";
  localStorage.setItem(STORAGE_KEY, visitText);

  return (
    <TextField
      fullWidth
      id="instrumentSession"
      label="Instrument Session"
      defaultValue={instrumentSession}
      onChange={e => setInstrumentSession(e.target.value)}
    />
  );
}

export default InstrumentSessionView;
