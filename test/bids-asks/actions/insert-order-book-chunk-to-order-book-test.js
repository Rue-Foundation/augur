import { describe, it } from 'mocha'
import { assert } from 'chai'
import proxyquire from 'proxyquire'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

describe(`modules/bids-asks/actions/insert-order-book-chunk-to-order-book.js`, () => {
  proxyquire.noPreserveCache()
  const test = t => it(t.description, () => {
    const store = configureMockStore([thunk])({})
    const insertOrderBookChunkToOrderBook = proxyquire('../../../src/modules/bids-asks/actions/insert-order-book-chunk-to-order-book', {
      './clear-order-book-on-first-chunk': t.stub.clearOrderBookOnFirstChunk
    }).default
    store.dispatch(insertOrderBookChunkToOrderBook(t.params.marketID, t.params.outcome, t.params.orderTypeLabel, t.params.orderBookChunk))
    t.assertions(store.getActions())
    store.clearActions()
  })
  test({
    description: 'insert order book chunk',
    params: {
      marketID: 'MARKET_0',
      outcome: 2,
      orderTypeLabel: 'buy',
      orderBookChunk: {
        '0x1': { amount: '1' }
      }
    },
    stub: {
      clearOrderBookOnFirstChunk: {
        default: (marketID, outcome, orderTypeLabel) => dispatch => dispatch({
          type: 'CLEAR_ORDER_BOOK_ON_FIRST_CHUNK',
          marketID,
          outcome,
          orderTypeLabel
        })
      }
    },
    assertions: (actions) => {
      assert.deepEqual(actions, [{
        type: 'CLEAR_ORDER_BOOK_ON_FIRST_CHUNK',
        marketID: 'MARKET_0',
        outcome: 2,
        orderTypeLabel: 'buy'
      }, {
        type: 'UPDATE_ORDER_BOOK',
        marketID: 'MARKET_0',
        outcome: 2,
        orderTypeLabel: 'buy',
        orderBook: {
          '0x1': { amount: '1' }
        }
      }])
    }
  })
})
