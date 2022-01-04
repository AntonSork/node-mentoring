import { Sequelize } from 'sequelize'
import { CONFIG } from '../../config'

export const sequelize = new Sequelize(CONFIG.DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})