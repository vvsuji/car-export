export interface CarModels {
	Acura: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	'Alfa Romeo': {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Audi: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	BMW: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	Buick: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Cadillac: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Chevrolet: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	Chrysler: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Dodge: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Fiat: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Ford: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	Genesis: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	GMC: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	Honda: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
		Vans: string[];
	};
	Hyundai: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Infiniti: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Jaguar: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Jeep: {
		Cars: never[];
		Trucks: never[];
		SUVs: string[];
	};
	Kia: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Koenigsegg: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	'Land Rover': {
		Cars: never[];
		Trucks: never[];
		SUVs: string[];
	};
	Lexus: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Lincoln: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Lotus: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Maserati: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Mazda: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	'Mercedes-Benz': {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Mini: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Mitsubishi: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Nissan: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	Pagani: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Polestar: {
		Cars: string[];
		Trucks: never[];
		SUVs: never[];
	};
	Porsche: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Ram: {
		Cars: never[];
		Trucks: string[];
		SUVs: never[];
	};
	Renault: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Subaru: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Tesla: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Toyota: {
		Cars: string[];
		Trucks: string[];
		SUVs: string[];
	};
	Volkswagen: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
	Volvo: {
		Cars: string[];
		Trucks: never[];
		SUVs: string[];
	};
}

export const carModels: CarModels = {
	Acura: {
		Cars: ['ILX', 'TLX', 'RLX', 'NSX'],
		Trucks: ['MDX', 'RDX'],
		SUVs: ['MDX Sport Hybrid', 'RDX A-Spec'],
	},

	'Alfa Romeo': {
		Cars: ['Giulia', 'Stelvio', 'Giulia Quadrifoglio', 'Stelvio Quadrifoglio'],
		Trucks: [],
		SUVs: [],
	},

	Audi: {
		Cars: [
			'A3',
			'A4',
			'A5',
			'A6',
			'A7',
			'A8',
			'R8',
			'RS3',
			'RS4',
			'RS5',
			'RS6',
			'RS7',
			'S3',
			'S4',
			'S5',
			'S6',
			'S7',
			'S8',
		],
		Trucks: ['Q7', 'Q8', 'e-tron', 'e-tron GT'],
		SUVs: [
			'Q3',
			'Q3 Sportback',
			'Q5',
			'Q5 Sportback',
			'Q7',
			'Q8',
			'e-tron',
			'e-tron Sportback',
			'SQ5',
		],
	},

	BMW: {
		Cars: [
			'1 Series',
			'2 Series',
			'3 Series',
			'4 Series',
			'5 Series',
			'6 Series',
			'7 Series',
			'8 Series',
			'M2',
			'M3',
			'M4',
			'M5',
			'M6',
			'Z4',
			'i3',
			'i4',
			'i8',
		],
		Trucks: [
			'X1',
			'X2',
			'X3',
			'X4',
			'X5',
			'X6',
			'X7',
			'X3 M',
			'X4 M',
			'X5 M',
			'X6 M',
		],
		SUVs: [
			'X1',
			'X2',
			'X3',
			'X4',
			'X5',
			'X6',
			'X7',
			'X3 M',
			'X4 M',
			'X5 M',
			'X6 M',
		],
	},

	Buick: {
		Cars: ['Regal', 'LaCrosse'],
		Trucks: [],
		SUVs: [
			'Encore',
			'Encore GX',
			'Enclave',
			'Envision',
			'Enclave Avenir',
			'Envision Avenir',
		],
	},

	Cadillac: {
		Cars: ['CT4', 'CT5', 'CT6', 'Escalade', 'Escalade ESV'],
		Trucks: [],
		SUVs: ['XT4', 'XT5', 'XT6', 'Escalade ESV'],
	},

	Chevrolet: {
		Cars: ['Camaro', 'Corvette', 'Malibu', 'Impala', 'Spark', 'Sonic'],
		Trucks: [
			'Silverado 1500',
			'Silverado HD',
			'Colorado',
			'Silverado 2500HD',
			'Silverado 3500HD',
		],
		SUVs: [
			'Equinox',
			'Traverse',
			'Tahoe',
			'Suburban',
			'Trailblazer',
			'Blazer',
			'Trax',
			'Bolt EV',
		],
	},

	Chrysler: {
		Cars: ['300', 'Pacifica', 'Voyager'],
		Trucks: [],
		SUVs: ['Pacifica Hybrid'],
	},

	Dodge: {
		Cars: ['Challenger', 'Charger', 'Durango', 'Journey', 'Grand Caravan'],
		Trucks: [],
		SUVs: ['Durango SRT'],
	},

	Fiat: {
		Cars: ['500', '500X', '500L', '500e', '124 Spider'],
		Trucks: [],
		SUVs: [],
	},

	Ford: {
		Cars: ['Fiesta', 'Focus', 'Fusion', 'Mustang', 'Taurus', 'GT'],
		Trucks: ['F-150', 'Ranger', 'Super Duty', 'F-250', 'F-350', 'F-450'],
		SUVs: [
			'Escape',
			'Edge',
			'Explorer',
			'Expedition',
			'Bronco Sport',
			'Bronco',
			'Maverick',
			'EcoSport',
		],
	},

	Genesis: {
		Cars: ['G70', 'G80', 'G90', 'GV70', 'GV80'],
		Trucks: [],
		SUVs: ['GV70', 'GV80'],
	},

	GMC: {
		Cars: ['Acadia', 'Terrain', 'Yukon', 'Yukon XL', 'Canyon'],
		Trucks: ['Sierra 1500', 'Sierra HD', 'Canyon'],
		SUVs: ['Terrain', 'Acadia', 'Yukon', 'Yukon XL'],
	},

	Honda: {
		Cars: ['Accord', 'Civic', 'Clarity', 'Fit', 'Insight'],
		Trucks: ['Ridgeline'],
		SUVs: ['HR-V', 'CR-V', 'Passport', 'Pilot'],
		Vans: ['Odyssey'],
	},

	Hyundai: {
		Cars: ['Accent', 'Elantra', 'Sonata', 'Veloster', 'Ioniq'],
		Trucks: [],
		SUVs: ['Venue', 'Kona', 'Tucson', 'Santa Fe', 'Palisade', 'Nexo'],
	},

	Infiniti: {
		Cars: ['Q50', 'Q60', 'Q70', 'QX50'],
		Trucks: [],
		SUVs: ['QX50', 'QX55', 'QX60', 'QX80'],
	},

	Jaguar: {
		Cars: ['XE', 'XF', 'XJ', 'F-TYPE'],
		Trucks: [],
		SUVs: ['E-PACE', 'F-PACE', 'I-PACE'],
	},

	Jeep: {
		Cars: [],
		Trucks: [],
		SUVs: [
			'Renegade',
			'Compass',
			'Cherokee',
			'Grand Cherokee',
			'Wrangler',
			'Grand Wagoneer',
			'Gladiator',
		],
	},

	Kia: {
		Cars: ['Forte', 'Optima', 'K5', 'Stinger', 'K900'],
		Trucks: [],
		SUVs: ['Seltos', 'Sportage', 'Sorento', 'Telluride'],
	},

	Koenigsegg: {
		Cars: ['Agera', 'Jesko', 'Regera', 'Gemera'],
		Trucks: [],
		SUVs: [],
	},

	'Land Rover': {
		Cars: [],
		Trucks: [],
		SUVs: [
			'Defender',
			'Discovery Sport',
			'Discovery',
			'Range Rover Evoque',
			'Range Rover Velar',
			'Range Rover',
			'Range Rover Sport',
			'Range Rover Sport SVR',
		],
	},

	Lexus: {
		Cars: ['IS', 'ES', 'GS', 'LS', 'RC', 'LC', 'LFA'],
		Trucks: [],
		SUVs: ['NX', 'RX', 'GX', 'LX', 'UX'],
	},

	Lincoln: {
		Cars: ['MKZ', 'Continental'],
		Trucks: [],
		SUVs: ['Corsair', 'Nautilus', 'Aviator', 'Navigator'],
	},

	Lotus: {
		Cars: ['Evora', 'Exige', 'Elise'],
		Trucks: [],
		SUVs: [],
	},

	Maserati: {
		Cars: [
			'Ghibli',
			'Quattroporte',
			'Levante',
			'GranTurismo',
			'GranCabrio',
			'MC20',
		],
		Trucks: [],
		SUVs: [],
	},

	Mazda: {
		Cars: ['Mazda3', 'Mazda6', 'MX-5 Miata'],
		Trucks: [],
		SUVs: ['CX-3', 'CX-30', 'CX-5', 'CX-9', 'MX-30'],
	},

	'Mercedes-Benz': {
		Cars: [
			'A-Class',
			'C-Class',
			'E-Class',
			'S-Class',
			'CLA',
			'CLS',
			'GLA',
			'GLB',
			'GLC',
			'GLE',
			'GLS',
			'SLC',
			'SL',
			'AMG GT',
			'EQS',
			'EQE',
			'EQB',
			'EQC',
		],
		Trucks: [],
		SUVs: ['GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'G-Class', 'EQB', 'EQC', 'EQS'],
	},

	Mini: {
		Cars: [
			'Hardtop 2 Door',
			'Hardtop 4 Door',
			'Convertible',
			'Clubman',
			'Countryman',
			'Electric Hardtop',
			'John Cooper Works GP',
			'John Cooper Works Convertible',
		],
		Trucks: [],
		SUVs: [],
	},

	Mitsubishi: {
		Cars: ['Mirage', 'Mirage G4', 'Outlander', 'Outlander Sport'],
		Trucks: [],
		SUVs: ['Eclipse Cross', 'Outlander PHEV'],
	},

	Nissan: {
		Cars: ['Versa', 'Sentra', 'Altima', 'Maxima', '370Z', 'GT-R'],
		Trucks: ['Frontier', 'Titan', 'Titan XD'],
		SUVs: ['Kicks', 'Rogue Sport', 'Rogue', 'Murano', 'Pathfinder', 'Armada'],
	},

	Pagani: {
		Cars: [
			'Huayra',
			'Huayra Roadster',
			'Huayra BC',
			'Zonda',
			'Zonda Roadster',
			'Zonda HP Barchetta',
		],
		Trucks: [],
		SUVs: [],
	},

	Polestar: {
		Cars: ['Polestar 1', 'Polestar 2'],
		Trucks: [],
		SUVs: [],
	},

	Porsche: {
		Cars: [
			'911',
			'718 Boxster',
			'718 Cayman',
			'Panamera',
			'Taycan',
			'Cayman GT4',
			'911 GT3',
		],
		Trucks: [],
		SUVs: ['Macan', 'Cayenne', 'Macan GTS', 'Cayenne Coupe'],
	},

	Ram: {
		Cars: [],
		Trucks: [
			'1500',
			'2500',
			'3500',
			'Chassis Cab',
			'ProMaster',
			'ProMaster City',
		],
		SUVs: [],
	},

	Renault: {
		Cars: ['Clio', 'Megane', 'Twingo', 'Captur', 'Arkana'],
		Trucks: [],
		SUVs: ['Kadjar', 'Koleos', 'Duster'],
	},

	Subaru: {
		Cars: ['Impreza', 'Legacy', 'WRX', 'BRZ', 'Crosstrek'],
		Trucks: [],
		SUVs: ['Forester', 'Outback', 'Ascent', 'XV', 'Outback Wilderness'],
	},

	Tesla: {
		Cars: ['Model S', 'Model 3', 'Roadster'],
		Trucks: [],
		SUVs: ['Model X', 'Model Y'],
	},

	Toyota: {
		Cars: [
			'Corolla',
			'Camry',
			'Avalon',
			'Prius',
			'Mirai',
			'Yaris',
			'Supra',
			'86',
		],
		Trucks: ['Tacoma', 'Tundra', 'Hilux', 'Land Cruiser 200'],
		SUVs: [
			'RAV4',
			'Highlander',
			'4Runner',
			'Sequoia',
			'Land Cruiser',
			'C-HR',
			'Venza',
			'Corolla Cross',
		],
	},

	Volkswagen: {
		Cars: ['Golf', 'Jetta', 'Passat', 'Arteon', 'ID.4', 'Tiguan Allspace'],
		Trucks: [],
		SUVs: ['Tiguan', 'Atlas', 'Taos'],
	},

	Volvo: {
		Cars: [
			'S60',
			'S90',
			'V60',
			'V90',
			'XC40',
			'XC60',
			'XC90',
			'XC60 Recharge',
			'XC90 Recharge',
		],
		Trucks: [],
		SUVs: ['XC40 Recharge', 'XC60 Recharge', 'XC90 Recharge'],
	},
};
