import { DataTypes, Model } from 'sequelize';
import sequelize from './database';

export class Location extends Model {}
Location.init({
  deviceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE, // Store as Date object
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Location',
});

export class Geofence extends Model {}
Geofence.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  radius: {
    type: DataTypes.FLOAT, // in meters
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Geofence',
});

export class AppUsage extends Model {}
AppUsage.init({
  deviceId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'AppUsage',
});

export class User extends Model {}
User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});
