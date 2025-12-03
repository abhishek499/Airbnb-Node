import Transport from "winston-transport";
import { Collection, Document } from "mongodb";

interface MongoDBTransportOptions extends Transport.TransportStreamOptions {
  collection: Collection<Document>;
}

export class MongoDBTransport extends Transport {
  private collection: Collection<Document>;

  constructor(options: MongoDBTransportOptions) {
    super(options);
    this.collection = options.collection;
  }

  async log(info: any, callback: () => void): Promise<void> {
    setImmediate(() => this.emit("logged", info));

    const { level, message, ...meta } = info;

    try {
      await this.collection.insertOne({
        level,
        message,
        meta: meta || null,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("MongoDB log insert failed:", error);
    }

    callback();
  }
}