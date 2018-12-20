/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

// /**
//  * Sample transaction
//  * @param {org.example.mynetwork.SampleTransaction} sampleTransaction
//  * @transaction
//  */
// async function sampleTransaction(tx) {
//     // Save the old value of the asset.
//     const oldValue = tx.asset.value;

//     // Update the asset with the new value.
//     tx.asset.value = tx.newValue;

//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('org.example.mynetwork.SampleAsset');
//     // Update the asset in the asset registry.
//     await assetRegistry.update(tx.asset);

//     // Emit an event for the modified asset.
//     let event = getFactory().newEvent('org.example.mynetwork', 'SampleEvent');
//     event.asset = tx.asset;
//     event.oldValue = oldValue;
//     event.newValue = tx.newValue;
//     emit(event);
// }

/**
 * Track the trade of a TradeAsset from one Customer to another
 * @param {org.example.mynetwork.Trade} trade - the trade to be processed
 * @transaction
 */
async function tradeAsset(trade){
    trade.tradeAsset.owner = trade.newOwner;
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.TradeAsset');
    let tradeNotification = getFactory().newEvent('org.example.mynetwork', 'TradeNotification');
    emit(tradeNotification);

    await assetRegistry.update(trade.tradeAsset);
}

/**
 * Remove all high volume trade assets
 * @param {org.example.mynetwork.RemoveHighQuantityTradeAssets} remove - the removal to be processed
 * @transaction
 */
async function removeHighQuantityTradeAssets(remove){
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.TradeAsset');
    let results = await query('selectTradeAssetsWithHighQuantity');

    for(let n = 0; n < results.length; n++){
        let trade = results[n];
        let removeNotification = getFactory().newEvent('org.example.mynetwork', 'RemoveNotification');

        removeNotification.tradeAsset = trade;
        emit(removeNotification);
        await assetRegistry.remove(trade);
    }
}
