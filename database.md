# Database Usign Mongose

## User Schema

- username (String)
- password (String)
- img-url (String)
- DOB (date)
- gender (boolean)
- isActive : (boolean/ false)
- isBlock : (boolean / false)
- location
- role : (enum : [vandor, Customer])

## users api

#### user signUp

- password increpted
- Email verificatio otp
- Dob valid date (date < cureent date )
- Profile Defalut Null
- allready exist or not end response

#### User Login

- Password Decrypt
- JWT TOEKN Genration and check

## Update user entities

- Passwrod,DOB,gender,profile update
- Block user
- Delete User
- Forgate password via otp.
- Google auth write in middleware

---

## Vandor

### Vandor shcema

- userID ref (for get user details )
- gst (nessusry)(string)
- v_address :[{}]
- rating
- isVerify : {boolean / false}

## Vandor Operation / Api's

- mobile otp verification optional
- gst verification
- Go to request to admin for vandor verification
- If admin accept send massge to vandor request send you request accepted send msg email / mobile
- update address

## User Searching for Vendor

- by address (near by me )
- by category
- by keyword search
- suggestion near location vandor max 9 - 12
- show vandor details specific vandor when user click (by id)
- make option for call redoirect to phone call
- user end enquiry to vandor send user email id and phon no and name to vandor
- user add any vandor in there wishlist
- optional (whatsapp chat redirect)

## Product schema

- product name : String,
- description : String
- price : String
- quantity_avilable : number
- seller_id : (refrance userid)
- catgeoryname : (refrance category name)
- images [1,2,3,4]
- discount : percentage

## category

- catgory-name : String

## Scrap Product list by user

- User hase to option user make call to vandor and list thire scrap product

## Scrap category

- category-name : String

## Scarp Product

- user_id (ref userid)
- category : (ref Scrap category)
- quantity : number
- wieght : nubmer
- location String
- contact_info : String,
- images [1,2,3,4]

## Product / Scrap product seaching operation

- search by name ,id,category,price
- delete product id
- update qunitity
- product name update
- add discount on price
- add product
# Review Rating Api 

- Add Review 