import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export class Institution extends Participant {
      institutionId: string;
      name: string;
      identifier: string;
   }
   export class Customer extends Participant {
      customerId: string;
      name: string;
      identifier: string;
      identifier_type: string;
   }
   export class TradeAsset extends Asset {
      tradeSymbol: string;
      description: string;
      quantity: number;
      owner: Customer;
   }
   export class Trade extends Transaction {
      institution: Institution;
      tradeAsset: TradeAsset;
      newOwner: Customer;
   }
// }
