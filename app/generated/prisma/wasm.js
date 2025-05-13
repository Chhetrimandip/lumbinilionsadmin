
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AssetScalarFieldEnum = {
  id: 'id',
  url: 'url'
};

exports.Prisma.FanScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  score: 'score',
  time: 'time'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  published: 'published',
  updatedat: 'updatedat',
  createdat: 'createdat'
};

exports.Prisma.QuizScalarFieldEnum = {
  id: 'id',
  question: 'question',
  options: 'options',
  correctanswer: 'correctanswer',
  answerimage: 'answerimage',
  answertext: 'answertext',
  points: 'points'
};

exports.Prisma.QuizzyScalarFieldEnum = {
  id: 'id',
  question: 'question',
  options: 'options',
  correctanswer: 'correctanswer',
  answerimage: 'answerimage',
  answertext: 'answertext',
  points: 'points'
};

exports.Prisma.BlogPostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  content: 'content',
  imageUrl: 'imageUrl',
  author: 'author',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  published: 'published',
  updatedAt: 'updatedAt',
  isFeatured: 'isFeatured'
};

exports.Prisma.LionsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  class: 'class',
  description: 'description',
  matches: 'matches',
  strikerate: 'strikerate',
  wickets: 'wickets',
  runs: 'runs',
  imageId: 'imageId',
  jersey: 'jersey'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  status: 'status',
  customerName: 'customerName',
  customerPhone: 'customerPhone',
  customerEmail: 'customerEmail',
  totalAmount: 'totalAmount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  quantity: 'quantity',
  size: 'size',
  price: 'price',
  name: 'name',
  imageUrl: 'imageUrl'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  transactionCode: 'transactionCode',
  transactionUuid: 'transactionUuid',
  status: 'status',
  amount: 'amount',
  paymentMethod: 'paymentMethod',
  paymentProof: 'paymentProof',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  price: 'price',
  description: 'description',
  imageId: 'imageId',
  availableSizes: 'availableSizes',
  inventory: 'inventory',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShippingAddressScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  recipientName: 'recipientName',
  phoneNumber: 'phoneNumber',
  city: 'city',
  district: 'district',
  streetAddress: 'streetAddress',
  landmark: 'landmark'
};

exports.Prisma.ScheduleScalarFieldEnum = {
  id: 'id',
  opponent: 'opponent',
  opponentLogo: 'opponentLogo',
  matchDate: 'matchDate',
  venue: 'venue',
  matchType: 'matchType',
  isCompleted: 'isCompleted',
  victory: 'victory',
  lionsRuns: 'lionsRuns',
  lionsWickets: 'lionsWickets',
  lionsOvers: 'lionsOvers',
  opponentRuns: 'opponentRuns',
  opponentWickets: 'opponentWickets',
  opponentOvers: 'opponentOvers',
  margin: 'margin',
  marginType: 'marginType',
  ballsLeft: 'ballsLeft',
  description: 'description',
  highlightUrl: 'highlightUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GalleryScalarFieldEnum = {
  id: 'id',
  imageUrl: 'imageUrl',
  title: 'title',
  createdAt: 'createdAt',
  category: 'category',
  parentCategory: 'parentCategory'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  name: 'name',
  played: 'played',
  won: 'won',
  lost: 'lost',
  nr: 'nr',
  points: 'points',
  pos: 'pos'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PlayerClass = exports.$Enums.PlayerClass = {
  Batsman: 'Batsman',
  WicketKeeper: 'WicketKeeper',
  AllRounder: 'AllRounder',
  Bowler: 'Bowler'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

exports.Size = exports.$Enums.Size = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING'
};

exports.Prisma.ModelName = {
  Asset: 'Asset',
  Fan: 'Fan',
  Post: 'Post',
  Quiz: 'Quiz',
  Quizzy: 'Quizzy',
  BlogPost: 'BlogPost',
  Lions: 'Lions',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Payment: 'Payment',
  Product: 'Product',
  ShippingAddress: 'ShippingAddress',
  Schedule: 'Schedule',
  Gallery: 'Gallery',
  Team: 'Team'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
