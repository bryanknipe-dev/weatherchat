module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const feeds = [
    "https://dhms.district196.org/fs/calendar-manager/events.ics?calendar_ids=1276",
    "https://dhms.district196.org/fs/calendar-manager/events.ics?calendar_ids=1375"
  ];

  try {
    const allEvents = [];

    for (const feed of feeds) {
      const response = await fetch(feed);
      const text = await response.text();

      const events = text.split("BEGIN:VEVENT").slice(1);

      events.forEach(eventText => {
        const summary =
          eventText.match(/SUMMARY:(.*)/)?.[1]?.trim() ||
          "DHMS Event";

        const startRaw =
          eventText.match(/DTSTART(?:;[^:]*)?:(.*)/)?.[1]?.trim();

        if (!startRaw) return;

        const cleanDate = startRaw.replace(/T.*$/, "");

        const year = cleanDate.slice(0, 4);
        const month = cleanDate.slice(4, 6);
        const day = cleanDate.slice(6, 8);

        allEvents.push({
          title: summary,
          date: `${year}-${month}-${day}`
        });
      });
    }

    allEvents.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    res.status(200).json({
      events: allEvents.slice(0, 20)
    });

  } catch (error) {
    res.status(500).json({
      error: "Could not load DHMS calendar."
    });
  }
};
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const feeds = [
    "https://dhms.district196.org/fs/calendar-manager/events.ics?calendar_ids=1276",
    "https://dhms.district196.org/fs/calendar-manager/events.ics?calendar_ids=1375"
  ];

  try {
    const allEvents = [];

    for (const feed of feeds) {
      const response = await fetch(feed);
      const text = await response.text();

      const events = text.split("BEGIN:VEVENT").slice(1);

      events.forEach(eventText => {

        const summary =
          eventText.match(/SUMMARY:(.*)/)?.[1]?.trim() ||
          "DHMS Event";

        const startRaw =
          eventText.match(/DTSTART(?:;[^:]*)?:(.*)/)?.[1]?.trim();

        if (!startRaw) return;

        const cleanDate = startRaw.replace(/T.*$/, "");

        const year = cleanDate.slice(0, 4);
        const month = cleanDate.slice(4, 6);
        const day = cleanDate.slice(6, 8);

        allEvents.push({
          title: summary,
          date: `${year}-${month}-${day}`
        });
      });
    }

    allEvents.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    res.status(200).json({
      events: allEvents.slice(0, 20)
    });

  } catch (error) {

    res.status(500).json({
      error: "Could not load DHMS calendar."
    });
  }
};
