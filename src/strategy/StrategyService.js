import {
  getStrategiesByUser,
  getReportByStrategyId,
  getReportByStrategyIdInstrument,
  postStrategy,
  backtest,
  getEvents,
  deleteStrategy
} from "core/proxy";

function* makePivotForYearlyReport(report) {
  for (;;) {
    if (report.length === 0) {
      break;
    }
    let index = -1;
    const { instrument } = report[0];
    const pivot = {
      instrument
    };
    do {
      index = report.findIndex(x => x.instrument === instrument);
      if (index > -1) {
        const { strategy, total, year, maxLoss, maxProfit } = report[index];
        pivot[`earn_${year}`] = total;
        pivot[`maxLoss_${year}`] = maxLoss;
        pivot[`maxProfit_${year}`] = maxProfit;
        pivot.strategyId = strategy;
        report.splice(index, 1);
      }
    } while (report.length > 0 && index > -1);
    yield pivot;
  }
}

function* makePivotForMonthlyReport(report) {
  if (report.length === 0) {
    return;
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  for (const month of months) {
    let index = -1;
    const { instrument } = report[0];

    const pivot = {
      instrument,
      month
    };
    do {
      index = report.findIndex(x => x.month === month);
      if (index > -1) {
        const { strategy, total, year, maxLoss, maxProfit } = report[index];
        pivot[`earn_${year}`] = total;
        pivot[`maxLoss_${year}`] = maxLoss;
        pivot[`maxProfit_${year}`] = maxProfit;
        pivot.strategyId = strategy;
        report.splice(index, 1);
      }
    } while (report.length > 0 && index > -1);
    yield pivot;
  }
}

class StrategyService {
  static async getStrategiesByUser(postedBy) {
    const strategies = await getStrategiesByUser(postedBy);
    return strategies;
  }

  static async getYearlyReport(strategyId) {
    const reports = await getReportByStrategyId(strategyId);
    const pivotedReport = [];
    for (const item of makePivotForYearlyReport(reports)) {
      pivotedReport.push(item);
    }
    return pivotedReport;
  }

  static async getMonthlyReport(strategyId, instrument) {
    const reports = await getReportByStrategyIdInstrument(
      strategyId,
      instrument
    );
    const pivotedReport = [];
    for (const item of makePivotForMonthlyReport(reports)) {
      pivotedReport.push(item);
    }
    return pivotedReport;
  }

  static async addStrategy({ postedBy, code, name, description, events }) {
    try {
      await postStrategy({ postedBy, code, name, events, description });
      return StrategyService.getStrategiesByUser(postedBy);
    } catch (err) {
      throw err;
    }
  }

  static async backtest(strategyId) {
    await backtest(strategyId);
    return StrategyService.getYearlyReport(strategyId);
  }

  static async deleteStrategy(strategyId) {
    await deleteStrategy(strategyId);
    return strategyId;
  }

  static async getEvents() {
    return getEvents();
  }
}

export default StrategyService;
