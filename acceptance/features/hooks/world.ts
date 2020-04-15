import {setWorldConstructor} from 'cucumber'
import {ShoppingCartsApi} from '../../../src/api/shoppingcarts_api'
import {ProductsApi} from '../../../src/api/products_api'
import {UUID} from '../../../src/types'
import {CheckoutService} from '../../../src/domain/checkout/checkoutservice'
import {ShoppingCartRepositoryInMemory} from '../../../src/persistence/shoppingcart_repository'
import {ShoppingCartRepository} from '../../../src/domain/shoppingcarts/shoppingcart'
import {ShoppingCartFixture} from '../../../src/domain/shoppingcarts/shoppingcart_fixture'
import {ProductRepositoryInMemory} from '../../../src/persistence/product_repository'
import {
  ProductFixture,
  ProductRepository
} from '../../../src/domain/products/product_fixture'
import {OrdersApi} from '../../../src/api/orders_api'
import {ShoppingCartItemsReadModel} from '../../../src/domain/shoppingcarts/shoppingcart_items_readmodel'
import {OrdersReadModel} from '../../../src/domain/orders/orders_readmodel'
import {ShoppingCartEmptyReadModel} from '../../../src/domain/shoppingcarts/shoppingcart_empty_readmodel'
import {ShoppingCartItemCountReadModel} from '../../../src/domain/shoppingcarts/shoppingcart_itemcount_readmodel'
import {ProductsReadModel} from '../../../src/domain/shoppingcarts/products_readmodel'
import {OrderFixture} from '../../../src/domain/orders/order_fixture'
import {OrderRepositoryInMemory} from '../../../src/persistence/order_repository'

class World {
  public productsApi: ProductsApi
  public productFixture: ProductFixture
  public productsReadModel: ProductsReadModel
  public productRepository: ProductRepository
  public shoppingCartFixture: ShoppingCartFixture
  public shoppingCartApi: ShoppingCartsApi
  public shoppingCartRepository: ShoppingCartRepository
  public shoppingCartItemsReadModel: ShoppingCartItemsReadModel
  private shoppingCartItemCountReadModel: ShoppingCartItemCountReadModel
  private shoppingCartEmptyReadModel: ShoppingCartEmptyReadModel
  public checkoutService: CheckoutService
  private orderFixture: OrderFixture
  public ordersApi: OrdersApi
  public ordersReadModel: OrdersReadModel

  // noinspection JSUnusedGlobalSymbols
  public cartId?: UUID


  public constructor() {

    this.productRepository = new ProductRepositoryInMemory()
    this.productFixture = new ProductFixture(this.productRepository)
    this.productsApi = new ProductsApi(this.productFixture)

    this.ordersReadModel = new OrdersReadModel()
    this.orderFixture = new OrderFixture(new OrderRepositoryInMemory())
    this.ordersApi = new OrdersApi(this.ordersReadModel)

    this.checkoutService = new CheckoutService()

    this.shoppingCartRepository = new ShoppingCartRepositoryInMemory()
    this.productsReadModel = new ProductsReadModel()
    this.shoppingCartFixture = new ShoppingCartFixture(this.shoppingCartRepository, this.productsReadModel)
    this.shoppingCartItemsReadModel = new ShoppingCartItemsReadModel()
    this.shoppingCartItemCountReadModel = new ShoppingCartItemCountReadModel()
    this.shoppingCartEmptyReadModel = new ShoppingCartEmptyReadModel()
    this.shoppingCartApi = new ShoppingCartsApi(this.shoppingCartFixture, this.shoppingCartItemsReadModel, this.shoppingCartItemCountReadModel, this.shoppingCartEmptyReadModel)
  }
}

setWorldConstructor(World)
