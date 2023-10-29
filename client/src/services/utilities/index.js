import io from "socket.io-client";
import axioKit from "./axioKit";
import handlePagination from "./pagination";
import Male from "../../assets/male.jpg";
import Female from "../../assets/female.jpg";
import bulkPayload from "./bulkPayload";
import globalSearch from "./globalSearch";
import capitalize from "./capitalize";
import swalConfirmation from "./swalConfirmation";

const ENDPOINT = "http://localhost:5000";
// const ENDPOINT = window.location.origin;
const socket = io.connect(ENDPOINT);

const PresetImage = gender => {
  if (gender) return Male;

  return Female;
};

export {
  swalConfirmation,
  capitalize,
  PresetImage,
  ENDPOINT,
  axioKit,
  socket,
  handlePagination,
  bulkPayload,
  globalSearch,
};
