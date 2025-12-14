import type { LogEntry, Person } from '../types'
import { DataCache } from './dataCache'

export class FileReader {

  static async loadDailyLogs(): Promise<LogEntry[]> {
    return DataCache.getDailyLogs()
  }

  static async loadWeeklyLogs(): Promise<LogEntry[]> {
    return DataCache.getWeeklyLogs()
  }

  static async loadMonthlyLogs(): Promise<LogEntry[]> {
    return DataCache.getMonthlyLogs()
  }

  static async loadYearlyLogs(): Promise<LogEntry[]> {
    return DataCache.getYearlyLogs()
  }

  static async loadAllEntries(): Promise<LogEntry[]> {
    return DataCache.getAllLogs()
  }

  static async loadPeople(): Promise<Person[]> {
    return DataCache.getPeople()
  }

  static async loadAllPeople(): Promise<Person[]> {
    return this.loadPeople()
  }
}