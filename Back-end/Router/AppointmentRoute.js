const express = require('express')
const Router = express.Router();
const {getAppointments , PostAppointments , DeleteAppointment , getTeacher ,UpdateTimeSlots,getTimeSlot, updateAppointment} = require('../Controller/AppointmentController')


Router.route('/Appointments').get(getAppointments).post(PostAppointments).delete(DeleteAppointment).put(updateAppointment);
Router.route('/Teacher').get(getTeacher)
Router.route('/Teacher/timeslots').put(UpdateTimeSlots).get(getTimeSlot)
module.exports  = Router