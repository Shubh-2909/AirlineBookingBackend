const {Flights} = require('../models/index')
const {Op} = require('sequelize')

class FlightRepository{

    // Using '#' , we can make private function and that function only works in that class.
    #createFilter(data){
       let filter={};
       if(data.arrivalAirportId){
        filter.arrivalAirportId = data.arrivalAirportId;
       }
       if(data.departureAirportId){
        filter.departureAirportId = data.departureAirportId;
       }
       if(data.minPrice && data.maxPrice){
        Object.assign(filter, {
            [Op.and]: [
                { price: {[Op.lte]: data.maxPrice} }, 
                { price: {[Op.gte]: data.minPrice} }
            ]
        });
       }
    //    let priceFilter=[];
       if(data.minPrice){
        Object.assign(filter , {price:{[Op.gte] : data.minPrice}});
        // priceFilter.push({price : {[Op.gte] : data.minPrice}})
       }
       if(data.maxPrice){
        Object.assign(filter , {price:{[Op.lte] : data.maxPrice}});
        // priceFilter.push({price : {[Op.lte] : data.maxPrice}})
       }
    //    Object.assign(filter, {[Op.and]: [{ price: {[Op.lte]: 7000} }, { price: {[Op.gte]: 4000} }]});
    // Array based approach for find the price between some two values
    // Object.assign(filter , {[Op.and] : priceFilter})
       return filter;
    }


    async createFlight(data){
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlight(flightId){
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllFlights(filter){
        try {
            const filterObject = this.#createFilter(filter)
            const flight = await Flights.findAll({
                where : filterObject,
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

}

module.exports = FlightRepository;

/*
  {
    // This is how sequel query looks like in which arrival airport is 2 departure is 4 and the price parameter.
    where:{
        arrivalAirportId:2,
        departureAirportId:4,
        price: {[Op.gte] : 4000}
    }
  }
*/