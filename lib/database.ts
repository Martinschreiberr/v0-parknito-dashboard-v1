import fs from "fs/promises"
import path from "path"

// Database configuration
const DB_PATH = path.join(process.cwd(), "..", "parking-data")

// Generic database operations
export class Database {
  private static async ensureDataDirectory(): Promise<void> {
    try {
      await fs.access(DB_PATH)
    } catch {
      // Directory doesn't exist, create it
      await fs.mkdir(DB_PATH, { recursive: true })
    }
  }

  private static async readFile<T>(filename: string): Promise<T[]> {
    try {
      await this.ensureDataDirectory()
      const filePath = path.join(DB_PATH, filename)

      try {
        const data = await fs.readFile(filePath, "utf8")
        return JSON.parse(data)
      } catch (readError) {
        // File doesn't exist, return empty array
        console.log(`File ${filename} doesn't exist, returning empty array`)
        return []
      }
    } catch (error) {
      console.error(`Error reading ${filename}:`, error)
      return []
    }
  }

  private static async writeFile<T>(filename: string, data: T[]): Promise<void> {
    try {
      await this.ensureDataDirectory()
      const filePath = path.join(DB_PATH, filename)
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8")
    } catch (error) {
      console.error(`Error writing ${filename}:`, error)
      throw error
    }
  }

  // Users operations
  static async getUsers() {
    return this.readFile("users.json")
  }

  static async getUserById(id: string) {
    const users = await this.getUsers()
    return users.find((user: any) => user.id === id) || null
  }

  static async createUser(userData: any) {
    const users = await this.getUsers()
    const newId = `usr_${String(users.length + 1).padStart(3, "0")}`
    const newUser = {
      id: newId,
      ...userData,
      created_at: new Date().toISOString(),
    }
    users.push(newUser)
    await this.writeFile("users.json", users)
    return newUser
  }

  static async updateUser(id: string, userData: any) {
    const users = await this.getUsers()
    const userIndex = users.findIndex((user: any) => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...userData }
    await this.writeFile("users.json", users)
    return users[userIndex]
  }

  static async deleteUser(id: string) {
    const users = await this.getUsers()
    const filteredUsers = users.filter((user: any) => user.id !== id)
    if (filteredUsers.length === users.length) return false

    await this.writeFile("users.json", filteredUsers)
    return true
  }

  // Companies operations
  static async getCompanies() {
    return this.readFile("companies.json")
  }

  static async getCompanyById(id: string) {
    const companies = await this.getCompanies()
    return companies.find((company: any) => company.id === id) || null
  }

  static async createCompany(companyData: any) {
    const companies = await this.getCompanies()
    const newId = `comp_${String(companies.length + 1).padStart(3, "0")}`
    const newCompany = {
      id: newId,
      ...companyData,
      created_at: new Date().toISOString(),
    }
    companies.push(newCompany)
    await this.writeFile("companies.json", companies)
    return newCompany
  }

  static async updateCompany(id: string, companyData: any) {
    const companies = await this.getCompanies()
    const companyIndex = companies.findIndex((company: any) => company.id === id)
    if (companyIndex === -1) return null

    companies[companyIndex] = { ...companies[companyIndex], ...companyData }
    await this.writeFile("companies.json", companies)
    return companies[companyIndex]
  }

  static async deleteCompany(id: string) {
    const companies = await this.getCompanies()
    const filteredCompanies = companies.filter((company: any) => company.id !== id)
    if (filteredCompanies.length === companies.length) return false

    await this.writeFile("companies.json", filteredCompanies)
    return true
  }

  // Locations operations
  static async getLocations() {
    return this.readFile("locations.json")
  }

  static async getLocationById(id: string) {
    const locations = await this.getLocations()
    return locations.find((location: any) => location.id === id) || null
  }

  static async getLocationsByCompany(companyId: string) {
    const locations = await this.getLocations()
    return locations.filter((location: any) => location.company_id === companyId)
  }

  static async createLocation(locationData: any) {
    const locations = await this.getLocations()
    const newId = `loc_${String(locations.length + 1).padStart(3, "0")}`
    const newLocation = {
      id: newId,
      ...locationData,
      created_at: new Date().toISOString(),
    }
    locations.push(newLocation)
    await this.writeFile("locations.json", locations)
    return newLocation
  }

  static async updateLocation(id: string, locationData: any) {
    const locations = await this.getLocations()
    const locationIndex = locations.findIndex((location: any) => location.id === id)
    if (locationIndex === -1) return null

    locations[locationIndex] = { ...locations[locationIndex], ...locationData }
    await this.writeFile("locations.json", locations)
    return locations[locationIndex]
  }

  static async deleteLocation(id: string) {
    const locations = await this.getLocations()
    const filteredLocations = locations.filter((location: any) => location.id !== id)
    if (filteredLocations.length === locations.length) return false

    await this.writeFile("locations.json", filteredLocations)
    return true
  }

  // Reservations operations
  static async getReservations() {
    return this.readFile("reservations.json")
  }

  static async getReservationById(id: string) {
    const reservations = await this.getReservations()
    return reservations.find((reservation: any) => reservation.id === id) || null
  }

  static async getReservationsByUser(userId: string) {
    const reservations = await this.getReservations()
    return reservations.filter((reservation: any) => reservation.user_id === userId)
  }

  static async getReservationsByLocation(locationId: string) {
    const reservations = await this.getReservations()
    return reservations.filter((reservation: any) => reservation.location_id === locationId)
  }

  static async createReservation(reservationData: any) {
    const reservations = await this.getReservations()
    const newId = `res_${String(reservations.length + 1).padStart(3, "0")}`
    const newReservation = {
      id: newId,
      ...reservationData,
      created_at: new Date().toISOString(),
    }
    reservations.push(newReservation)
    await this.writeFile("reservations.json", reservations)
    return newReservation
  }

  static async updateReservation(id: string, reservationData: any) {
    const reservations = await this.getReservations()
    const reservationIndex = reservations.findIndex((reservation: any) => reservation.id === id)
    if (reservationIndex === -1) return null

    reservations[reservationIndex] = { ...reservations[reservationIndex], ...reservationData }
    await this.writeFile("reservations.json", reservations)
    return reservations[reservationIndex]
  }

  static async cancelReservation(id: string) {
    return this.updateReservation(id, { status: "cancelled" })
  }

  // Spots operations
  static async getSpots() {
    return this.readFile("spots.json")
  }

  static async getSpotById(id: string) {
    const spots = await this.getSpots()
    return spots.find((spot: any) => spot.id === id) || null
  }

  static async getSpotsByLocation(locationId: string) {
    const spots = await this.getSpots()
    return spots.filter((spot: any) => spot.location_id === locationId)
  }

  static async createSpot(spotData: any) {
    const spots = await this.getSpots()
    const newId = `spot_${String(spots.length + 1).padStart(3, "0")}`
    const newSpot = {
      id: newId,
      ...spotData,
    }
    spots.push(newSpot)
    await this.writeFile("spots.json", spots)
    return newSpot
  }

  static async updateSpot(id: string, spotData: any) {
    const spots = await this.getSpots()
    const spotIndex = spots.findIndex((spot: any) => spot.id === id)
    if (spotIndex === -1) return null

    spots[spotIndex] = { ...spots[spotIndex], ...spotData }
    await this.writeFile("spots.json", spots)
    return spots[spotIndex]
  }

  static async deleteSpot(id: string) {
    const spots = await this.getSpots()
    const filteredSpots = spots.filter((spot: any) => spot.id !== id)
    if (filteredSpots.length === spots.length) return false

    await this.writeFile("spots.json", filteredSpots)
    return true
  }
}
