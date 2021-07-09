exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("users")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("users").insert([
				{
					name: "Diana Munoz",
					email: "DianaJMunoz@rhyta.com",
					username: "Yesithisces",
					password: "LohQu1pha",
					city: "Detroit",
					gender: "Female",
				},
				{
					name: "Mark Guajardo",
					email: "MarkHGuajardo@jourrapide.com",
					username: "Shaterinew",
					password: "eeC4aebai",
					city: "Los Angeles",
					gender: "Male",
				},
				{
					name: "Johanna Peralta",
					email: "JohannaEPeralta@rhyta.com",
					username: "Olstoord",
					password: "Eijiemee0qu",
					city: "New York",
					gender: "Female",
				},
				{
					name: "Donald Hedrick",
					email: "DonaldBHedrick@dayrep.com",
					username: "Chised00",
					password: "eim7uudu1Ye",
					city: "Chicago",
					gender: "Male",
				},
				{
					name: "Linda Sasser",
					email: "LindaHSasser@armyspy.com",
					username: "Hemed1989",
					password: "shii4ahCiu",
					city: "San Francisco",
					gender: "Female",
				},
				{
					name: "John Stalvey",
					email: "JohnPStalvey@teleworm.us",
					username: "Gois1949",
					password: "ra8Aish2U",
					city: "Seattle",
					gender: "Male",
				},
				{
					name: "Marietta Morris",
					email: "MariettaDMorris@jourrapide.com",
					username: "Pricien89",
					password: "Ti0ang6d",
					city: "Boston",
					gender: "Female",
				},
				{
					name: "Christina Reid",
					email: "ChristinaWReid@dayrep.com",
					username: "Phroodession1986",
					password: "eiFohX3z",
					city: "Austin",
					gender: "Female",
				},
				{
					name: "Tonya Tartt",
					email: "TonyaGTartt@armyspy.com",
					username: "Joyse2002",
					password: "EJ1aigahgu5",
					city: "San Diego",
					gender: "Fale",
				},
				{
					name: "William Field",
					email: "WilliamAField@teleworm.us",
					username: "Virs1938",
					password: "foor3Wuu",
					city: "Denver",
					gender: "Male",
				},
			]);
		});
};
