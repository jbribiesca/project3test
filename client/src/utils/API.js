import axios from "axios";

export default {
  // Gets all books
  getAppointments: function() {
    return axios.get("/api/appointments");
  },
  // Gets the book with the given id
  getAppointment: function(id) {
    return axios.get("/api/appointments/" + id);
  },
  // Deletes the book with the given id
  deleteAppointment: function(id) {
    return axios.delete("/api/appointments/" + id);
  },
  // Saves a book to the database
  saveAppointment: function(bookData) {
    return axios.post("/api/appointments", bookData);
  }
};
