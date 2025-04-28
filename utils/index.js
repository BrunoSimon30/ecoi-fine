import moment from "moment";
import { getSession, signIn } from "next-auth/react";

export const loginUser = async ({ email, password }) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });
  if (res) {
    res.error = res?.error && JSON?.parse(res?.error || "");
  }
  return res;
};

export const addTokenToRequest = async (headers, { getState }) => {
  const session = await getSession({});

  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session?.accessToken}`);
  }
  headers.set("Cache-Control", "no-cache");
  // headers.set("Access-Control-Allow-Origin", "*");
  return headers;
};

export const moveToLast = (array, target) => {
  const mutable = [...array];
  const index = mutable.findIndex((item) => item.type === target);

  if (index !== -1) {
    const textareaObject = mutable[index];
    mutable.splice(index, 1);
    mutable.push(textareaObject);
  }

  return mutable;
};

export function getFormData(object, formData, parentKey) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      let newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof object[key] === "object" && object[key] !== null) {
        getFormData(object[key], formData, newKey);
      } else {
        formData.append(newKey, object[key]);
      }
    }
  }
  return formData;
}

export function truncateString(text, num = 50) {
  if (!text) return null;
  if (text.length <= num) {
    return text;
  }
  return text.slice(0, num) + "...";
}

export const imageSrc = (src) => {
  return src?.startsWith("http")
    ? src
    : `${process.env.NEXT_PUBLIC_MEDIA_URL}${src}`;
};

export const sortAndGroupMessagesByDate = (messages) => {
  // Sort messages by createdAt
  const sortedMessages = messages
    .slice()
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  // Group messages by date
  const groupedMessages = sortedMessages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toDateString(); // Format as 'Mon Aug 12 2024'
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  // Convert grouped messages object to array of objects
  return Object.keys(groupedMessages).map((date) => ({
    date,
    messages: groupedMessages[date],
  }));
};

export const convertTimeToUTC = (time) => {
  console.log("🚀 ~ convertTimeToUTC ~ time:", time);
  const converted = moment(time, "HH:mm")
    // .set({
    //   date: moment(new Date()).date(),
    //   year: moment(new Date(), "YYYY-MM-DD").year(),
    //   month: moment(new Date(), "YYYY-MM-DD").month(),
    // })
    .utc()
    .format("HH:mm");
  // .toISOString();
  return converted;
};

export const dateToISO = (date) =>
  moment(date)?.format("YYYY-MM-DD 00:00:00.000");
export const timeToISO = (date) =>
  moment(new Date(date))?.utc()?.toISOString()?.split("T")?.join(" ");

export const formatStartDate = (startDate) => {
  const today = moment().format("YYYY-MM-DD"); // Get current date
  const eventDate = moment(startDate).format("YYYY-MM-DD"); // Format startDate

  return today === eventDate ? "Today" : "";
};

export const formatDateTime = (timestamp) => {
  return moment(timestamp).format("MMM DD, YYYY | hh:mm A");
};

export const capitalizedText = (value) => {
  if (!value) return null;
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
};

export const getDaysDiff = (
  start_date,
  end_date,
  date_format = "YYYY-MM-DD"
) => {
  const getDateAsArray = (date) => {
    return moment(date.split(/\D+/), date_format);
  };
  return getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1;
};

export const getUniqueId = () => {
  let arr = [];
  if (arr.length < 3) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr?.join();
};
