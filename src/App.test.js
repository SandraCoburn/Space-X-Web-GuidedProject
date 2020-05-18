import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchMissions as mockFetchMisions } from "./api/fetchMissions";
import App from "./App";

// assert that data is rendered _AFTER_ the api fetch is completed
//outside of th
jest.mock("./api/fetchMissions");
const missionData = {
  data: [
    {
      mission_name: "Thaicom",
      mission_id: "9D1B7E0",
      manufacturers: ["Orbital ATK"],
      payload_ids: ["Thaicom 6", "Thaicom 8"],
      wikipedia: "https://en.wikipedia.org/wiki/Thaicom",
      website: "http://www.thaicom.net/en/satellites/overview",
      twitter: "https://twitter.com/thaicomplc",
      description:
        "Thaicom is the name of a series of communications satellites operated from Thailand, and also the name of Thaicom Public Company Limited, which is the company that owns and operates the Thaicom satellite fleet and other telecommunication businesses in Thailand and throughout the Asia-Pacific region. The satellite projects were named Thaicom by the King of Thailand, His Majesty the King Bhumibol Adulyadej, as a symbol of the linkage between Thailand and modern communications technology.",
    },
    {
      mission_name: "Telstar",
      mission_id: "F4F83DE",
      manufacturers: ["SSL"],
      payload_ids: ["Telstar 19V", "Telstar 18V"],
      wikipedia: "https://en.wikipedia.org/wiki/Telesat",
      website: "https://www.telesat.com/",
      twitter: null,
      description:
        "Telstar 19V (Telstar 19 Vantage) is a communication satellite in the Telstar series of the Canadian satellite communications company Telesat. It was built by Space Systems Loral (MAXAR) and is based on the SSL-1300 bus. As of 26 July 2018, Telstar 19V is the heaviest commercial communications satellite ever launched, weighing at 7,076 kg (15,600 lbs) and surpassing the previous record, set by TerreStar-1 (6,910 kg/15230lbs), launched by Ariane 5ECA on 1 July 2009.",
    },
  ],
};
console.log(mockFetchMisions);

test("renders without errors", () => {
  render(<App />);
});
test("renders data after API is called", async () => {
  //mock the resolved value (just once so that we an reuse the mocked function in other)
  // test needs to render App, click on the "getdata" button,
  mockFetchMisions.mockResolvedValueOnce(missionData);
  const { getByText, queryAllByTestId } = render(<App />);
  userEvent.click(getByText(/get data/i)); // if API callhappens on mount, don't need this step
  //mockFetchMission is being called and will resolve with missionsData
  //I want to mimic event better the events from user interactions
  await waitFor(() => expect(queryAllByTestId(/missions/i)).toHaveLength(2));
});
