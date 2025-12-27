import mongoose from "mongoose";


// -------------------Admin-----------------------------------
const Admin = new mongoose.Schema({
  name : {
      type : String,
      required : [true,"Provide name"],
      required : true
  },
  email : {
      type : String,
      required : [true,"Provide name"],
      required : true
  },
  role : {
      type : String,
      required : true
  },
  revenue:[
    {
      month: String,
      revenue: Number
    }
  ],
  password : {
      type : String,
      required : true
  }
})

export const AdminModel = mongoose.model("Admins", Admin)


// ------------------------learner-----------------------------------------------------
const Lerner_userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name"],
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
   avatar: {
    type: String,
  },
  subjects: {
    type: [String],
    required: true,
  },
  todos: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }
  ],
  
  needExpert: {
    type: String,
  },
  needCoach: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  terms1: {
    type: Boolean,
    required: true,
  },
  terms2: {
    type: Boolean,
    required: true,
  },
  terms3: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    default: 0
  },
  suspended: {
    type: String,
    enum: ['YES', 'NO'],
    default: 'NO',
  },
  unlockededucators: {
    type: [String]
  },
  theme:{
    type:String,
    enum:['light' , 'dark'],
    default:'light'
  },
  totalSessions: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


export const LearnerUserModel = mongoose.model("User-learners", Lerner_userSchema);


// -------------------------educator---------------------------------------------
const Educator_userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide name"],
  },
  email: {
    type: String,
    required: [true, "Provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  subrole: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  phone: {
    type: String, 
  },
  dob: {
    day: Number,
    month: Number,
    year: Number,
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    postal_code: String,
  },
  bio: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
  },
  subjects: {
    type: [String],
  },
  serviceType: {
    type: String,
    required: true,
  },
  sessionfee: {
    type: Number
  },
  wallet: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: "GBP",
  },

  payoutMethod: {
    type: String, // bank / upi / paypal / other
  },
  upiId: {
    type: String,
    required: function () {
      return this.payoutMethod === 'upi';
    },
  },
  bankAccount: {
    type: String, // account_number
    required: function () {
      return this.payoutMethod === 'bank';
    },
  },
  ifscCode: {
    type: String, // sort_code (for UK), or IFSC (for India)
    required: function () {
      return this.payoutMethod === 'bank';
    },
  },
  paypalEmail: {
    type: String,
    required: function () {
      return this.payoutMethod === 'paypal';
    },
  },
  otherPayout: {
    type: String,
    required: function () {
      return this.payoutMethod === 'other';
    },
  },

  stripeAccountId: {
    type: String,
  },
  stripeOnboardingStatus: {
    type: String, // pending | completed | restricted | error
    default: "pending",
  },

  documentUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  }, 
  avatar: {
    type: String,
  },

  terms1: { type: Boolean, required: true },
  terms2: { type: Boolean, required: true },
  terms3: { type: Boolean, required: true },
  terms4: { type: Boolean, required: true },
  terms5: { type: Boolean, required: true },

  Approved: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
    default: 0,
  },
  suspended: {
    type: String,
    enum: ['YES', 'NO'],
    default: 'NO',
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light',
  },
  totalSessions: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export const EducatorUserModel = mongoose.model("User-educators", Educator_userSchema);






//--------------------------------SessionModel-----------------------------------------

const sessionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-learners',
    required: true,
  },
  educatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User-educators',
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  zoomMeetingId: {
    type: String,
    required: true,
  },
  zoomJoinUrl: {
    type: String,
    required: true,
  },
  zoomStartUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

export const SessionModel = mongoose.model("Sessions", sessionSchema);



// -----------------paymentSchema---------------------------------------------------
const paymentSchema = new mongoose.Schema({
  learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User-learners', required: true },
  educatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User-educators', required: true },
  topic: String,
  paymentStatus: { type: String, default: 'completed' },
  stripeSessionId: String,
  amountPaid:Number,
  createdAt: { type: Date, default: Date.now },
});
export const PaymentRecord = mongoose.model("PaymentRecord", paymentSchema);


// --------------------------------------WithdrawelRequestSchema----------------------------------
const WithdrawelRequestSchema = new mongoose.Schema({
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-educators",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "GBP",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "paid"],
    default: "pending",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  processedAt: Date,
}, {
  timestamps: true,
});
export const WithdrawelRequestModel = mongoose.model("WithdrawelRequest", WithdrawelRequestSchema);


// ----------------------------WalletTransactions History---------------------------------------------------
const WalletTransactionSchema = new mongoose.Schema({
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-educators",
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  reason: {
    type: String,
    enum: ['session', 'refund', 'withdrawal', 'bonus'],
  },  
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const WalletTransactionModel = mongoose.model("WalletTransaction", WalletTransactionSchema);
