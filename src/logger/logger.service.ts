import { Injectable } from '@nestjs/common';
import { CreateLogDto, FindLogsFilter, LogsSortEnum } from './dto/logs.dto';
import { OrderType } from '../helpers/constants/orderEnum';

@Injectable()
export class LoggerService {
  constructor() {}

  async createLog(log: CreateLogDto) {
    // const newLog = this.logsRepository.create(log);
    // await this.logsRepository.save(newLog, { data: { isCreatingLogs: true } });
    // return newLog;
  }

  // async findAllLogs(query: FindLogsFilter) {
  //   const {
  //     page = 1,
  //     take = 10,
  //     orderBy = LogsSortEnum.createdAt_ASC,
  //     order = OrderType.ASC,
  //   } = query;

  //   const logsQuery = this.logsRepository
  //     .createQueryBuilder('logs')
  //     .orderBy(`"${orderBy}"`, order)
  //     .take(take)
  //     .skip((page - 1) * take);
  //   if (query.level) {
  //     logsQuery.where('logs.level = :level', { level: query.level });
  //   }
  //   if (query.method) {
  //     logsQuery.where('logs.method = :method', { method: query.method });
  //   }
  //   const [logs, count] = await logsQuery.getManyAndCount();
  //   return {
  //     logs: logs,
  //     count: count,
  //     message: 'Logs returned successfully!',
  //   };
  // }
}
