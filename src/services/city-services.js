const {CityRepository} = require('../repository/index');

class CityService{
    // We cannot use contructor (depend on choice) and just like done in city-repository.
    constructor(){
        this.cityRepository = new CityRepository();
    }

    async createCity(data){
        try {
            const city = await this.cityRepository.createCity(data);
            return city;

        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error};
        }
    }

    async deleteCity(cityId){
        try {
            const response = await this.cityRepository.deleteCity(cityId);
            return response;
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error};
        }
    }

    async updateCity(cityId , data){
        try {
            const city = await this.cityRepository.upadteCity(cityId , data);
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error};
        }
    }

    async getCity(cityId){
        try {
            const city = await this.cityRepository.getCity(cityId);
            return city;
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error};
        }
    }

    async getAllCities(filter){
        try {
            const  cities = await this.cityRepository.getAllCities({name : filter.name}); //Making new object and named a key as name and take value from filter.name
            return cities;
        } catch (error) {
            console.log("Something went wrong at service layer")
            throw {error};
        }
    }
}

module.exports = CityService