import userModel from '../modals/userSchema.js';
import mealModel from '../modals/mealSchema.js';


// Fetching All user from DB
export const AllUserDB = async(req,res)=>{
  try {
      console.log("I am called 1")
       const totalUser = await userModel.countDocuments({}); // Counting Number of user present in the DB
       const data = await userModel.find({}).sort({userCreatedAt:-1})  // fetch all user from userModel and sort them by newest first  
      // console.log("data in Backend",data);
      // console.log("total user in Backend",totalUser)
       res.status(200).json({
           totalUser,
           userDetails:data,
           message: 'Successfully fetch all user'
       })  
  } catch (error) {
      console.log("welcome to Error in AllUserDB (AdminSection)",error);
      res.status(404).json({ error:`Error in AllUserDB(AdminSection)${error}` })
  }
}

// end of Fetching all user

// Edit User based on username(ID) 
export const EditUserByName = async(req,res)=>{
  console.log("I am called 2")  
  const {id}= req.body;
    try {
        
    } catch (error) {
      console.log("welcome to Error in EditUSerByName (AdminSection)",error);
      res.status(404).json({ error:`Error in EditUSerByName(AdminSection)${error}` })
    }
}
// end of EditUSer

// Delete user based on Id(Name)
export const DeleteUserById = async(req,res)=>{
  console.log("I am called 3") 
  const {id} = req.params;
    try {
        //1. delete user from userSchema
        //2. delete mealInfo from mealSchema on basis of userId
        await userModel.findByIdAndRemove(id);
        await mealModel.deleteMany({userId:id});
        res.status(200).json({
          message: "Successfully Deleted user"
        })

    } catch (error) {
      console.log("welcome to Error in DeleteUserById (AdminSection)",error);
      res.status(404).json({ error:`Error in DeleteUserById(AdminSection)${error}` })
    }
}
// end of Delete user

// fetch all meals based on userId
export const AllMealsByUserId = async (req,res)=>{
  console.log("I am called 4")  
  const {id} = req.params;
    // console.log("id ",id)
    try {
        const userMealsDetails = await mealModel.aggregate([
            {$match: {userId: id}},  // filter data based on userID
            {$group:{
                _id: "$mealDate",  // group them on date
                mealInfoDate:{
                  $push:{
                    mealName: "$mealName",
                    mealType: "$mealType",
                    mealCalories: "$mealCalories",
                    mealDescription:"$mealDescription",
                    createdAt: "$createdAt",
                  }
                },
                totalMealOnDate: {$sum: 1},
                totalCaloriesOnDate: {$sum : "$mealCalories"}, 
            }},
            {$sort: {mealDate: -1}}     
        ]); // fetch all meals info based on userId and grouping them based on MealDate
        // console.log("Meal Info Based On Date:", userMealsDetails);
        res.status(200).json({
          userMealsDetails,
          message:"Successfully Fetch information"
        })
    } catch (error) {
      console.log("welcome to Error in AllMealsByUserId (AdminSection)",error);
      res.status(404).json({ error:`Error in AllMealsByUserId(AdminSection)${error}` })
    }
}
// end of fetch all meals based on userId

// start of search userName by Admin
export const searchUserName =async(req,res)=>{
  console.log("I am called 5")
  //console.log("req is: ",req);
  const  {searchQuery} = req.query;
  //console.log(" i am contacted")
  console.log("Search Query is:",searchQuery);

   try {
       const searchName = new RegExp(searchQuery,"i");
       console.log("SearchName", searchName);
       const userNameList = await userModel.find({userName:searchName});
       console.log('userNameList in backend',userNameList);
       res.status(200).json({
         userNameList,
         message:"Successfully fetch user Name"
       })
   } catch (error) {
     console.log("Welcome to Error: Search User Name by Admin",error);
     res.status(404).json({
       message:` Error in search userName: ${error}`,
       error
     })
   }
}

// end of search userName by Admin



/**
 * Task 5 : Build the apis (routes) for Admin’s use cases: (For all the below apis check if logged in user is admin before executing the actual code)
1. List Users → Api to list all the users from database
2. Edit User → Api to edit a user based on username
3. Delete User → Api to remove user from database
4. Get api to list the meals of a user based on the selected username with the same filters as above

 */