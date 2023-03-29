const { validJourney, validStation } = require('./validation');

const invalidDepDate = '2021-05-31T25:54:48,2021-06-01T00:00:57,292,Koskelan varikko,133,Paavalinpuisto,1713,366';
const invalidRetDate = '2021-05-31T23:54:48,202c-06-01T00:00:57,292,Koskelan varikko,133,Paavalinpuisto,1713,366';
const returnBeforeDeparure = '2021-05-31T23:54:13,2021-05-31T23:33:29,547,Jämeräntaival,547,Jämeräntaival,1872,1239';
const negDepStationId1 = '2021-05-31T23:23:34,2021-05-31T23:49:44,-042,Haapaniemenkatu,147,Käpylän asema,4712,1564';
const negDepStationId2 = '2021-05-31T23:23:34,2021-05-31T23:49:44,042,Haapaniemenkatu,-147,Käpylän asema,4712,1564';
const nanDepStationId1 = '2021-05-31T23:23:34,2021-05-31T23:49:44,xyz,Haapaniemenkatu,147,Käpylän asema,4712,1564';
const nanDepStationId2 = '2021-05-31T23:23:34,2021-05-31T23:49:44,123,Haapaniemenkatu,å7,Käpylän asema,4712,1564';
const invalidDuration = '2021-05-30T19:53:23,2021-05-30T20:04:06,052,Heikkilänaukio,031,Marian sairaala,4,640';
const nanDuration = '2021-05-30T19:53:23,2021-05-30T20:04:06,052,Heikkilänaukio,031,Marian sairaala,fff,640';
const invalidDistance = '2021-05-30T19:53:23,2021-05-30T20:04:06,052,Heikkilänaukio,031,Marian sairaala,42432,0';
const nanDistance = '2021-05-30T19:53:23,2021-05-30T20:04:06,052,Heikkilänaukio,031,Marian sairaala,42432,asd';
const validLine = '2021-05-30T19:50:29,2021-05-30T20:08:08,264,Eränkävijäntori,245,Kulosaari (M),2968,1057'

const negStationId = '11,-519,Tapionaukio,Tapioplatsen,Tapionaukio,Tapionaukio 9,Tapioplatsen 9,Espoo,Esbo,CityBike Finland,26,24.805825,60.176168'
const nanStationId = '11,abc,Tapionaukio,Tapioplatsen,Tapionaukio,Tapionaukio 9,Tapioplatsen 9,Espoo,Esbo,CityBike Finland,26,24.805825,60.176168'
const invalidLong = '11,519,Tapionaukio,Tapioplatsen,Tapionaukio,Tapionaukio 9,Tapioplatsen 9,Espoo,Esbo,CityBike Finland,226,224.805825,60.176168'
const invalidLat = '11,519,Tapionaukio,Tapioplatsen,Tapionaukio,Tapionaukio 9,Tapioplatsen 9,Espoo,Esbo,CityBike Finland,26,24.805825,-160.176168'
const validStationData = '90,729,Leppävaaranaukio,Albergaplanen,Leppävaaranaukio,Hevosenkenkä 3,Hästskon 3,Espoo,Esbo,CityBike Finland,30,24.813885,60.218869'

describe('Journey validation', () => {
  describe('Validating journey csv data', () => {
    it('should return false if departure is not valid date', () => {
      const result = validJourney(invalidDepDate);
      expect(result).toBe(false);
    }),
    it('should return false if return is not valid date', () => {
      const result = validJourney(invalidRetDate);
      expect(result).toBe(false);
    }),
    it('should return false if return date is before departure date', () => {
      const result = validJourney(returnBeforeDeparure);
      expect(result).toBe(false);
    }),
    it('should return false if station id is negative', () => {
      let result = validJourney(negDepStationId1);
      expect(result).toBe(false);
      result = validJourney(negDepStationId2);
      expect(result).toBe(false);
    }),
    it('should return false if station id is not a number', () => {
      let result = validJourney(nanDepStationId1);
      expect(result).toBe(false);
      result = validJourney(nanDepStationId2);
      expect(result).toBe(false);
    }),
    it('should return false if duration is less than 10', () => {
      const result = validJourney(invalidDuration);
      expect(result).toBe(false);
    }),
    it('should return false if duration is not a number', () => {
      const result = validJourney(nanDuration);
      expect(result).toBe(false);
    }),
    it('should return false if distance is less than 10', () => {
      const result = validJourney(invalidDistance);
      expect(result).toBe(false);
    }),
    it('should return false if distance is not a number', () => {
      const result = validJourney(nanDistance);
      expect(result).toBe(false);
    }),
    it('should return true if journey is valid', () => {
      const result = validJourney(validLine);
      expect(result).toBe(true);
    })
  }),
  describe('Validating station csv data', () => {
    it('should return false if station id is negative', () => {
      const result = validStation(negStationId);
      expect(result).toBe(false);
    }),
    it('should return false if station id is not a number', () => {
      const result = validStation(nanStationId);
      expect(result).toBe(false);
    }),
    it('should return false if longitude is not valid', () => {
      const result = validStation(invalidLong);
      expect(result).toBe(false);
    }),
    it('should return false if latitude is not valid', () => {
      const result = validStation(invalidLat);
      expect(result).toBe(false);
    }),
    it('should return true if station is valid', () => {
      const result = validStation(validStationData);
      expect(result).toBe(true);
    })
  })
})