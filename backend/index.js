import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const port = 8100;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));

const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "2019331092",
 database: "CookEase",
});

const storage = multer.diskStorage({
 destination: "./uploads/",
 filename: (req, file, cb) => {
  cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
 },
});

const upload = multer({
 storage: storage,
});

app.listen(port, () => {
 console.log(`CookEase is alive at http://localhost:${port}`);
});

// Define a function to query the database using Promises
function queryDatabase(query, values) {
 return new Promise((resolve, reject) => {
  db.query(query, values, (err, data) => {
   if (err) {
    reject(err);
   } else {
    resolve(data);
   }
  });
 });
}

// get user by id
app.get("/users/:id", (req, res) => {
 const userId = req.params.id;
 const q = "select * from site_user where user_id=(?)";
 const values = [userId];
 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});

// add user
app.post("/add_user", (req, res) => {
 const q =
  "insert into CookEase.site_user(`first_name`,`last_name`,`email`,`password`) values(?)";
 const values = [
  req.body.first_name,
  req.body.last_name,
  req.body.email,
  req.body.password,
 ];
 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  return res.json("user has been added successfully");
 });
});

// login user
app.post("/login_user", (req, res) => {
 const q =
  "SELECT user_id, first_name, last_name, email, profile_pic_url FROM CookEase.site_user WHERE email = ? AND password = ?";
 const values = [req.body.email, req.body.password];

 db.query(q, values, (err, data) => {
  if (err) {
   console.error("Error logging in:", err);
   return res.status(500).json({ error: "Error logging in" });
  } else {
   if (data.length === 1) {
    return res.status(200).json(data[0]);
   } else {
    return res.status(401).json({ error: "Invalid credentials" });
   }
  }
 });
});

app.get("/featured_recipes", (req, res) => {
 const limit = 5; // Number of recent recipes to fetch

 // SQL query to select the 5 most recent recipes
 const query = `
    SELECT recipe_id, COUNT(*) as like_count
    FROM CookEase.recipe_reaction
    GROUP BY recipe_id
    ORDER BY like_count DESC
    LIMIT ?;
    `;

 // Execute the SQL query with the specified limit
 db.query(query, [limit], (error, results) => {
  if (error) {
   console.error("Error fetching recent recipes:", error);
   // Handle the error here, e.g., send an error response
   res.status(500).json({ error: "Error fetching recent recipes" });
  } else {
   // Send the retrieved recent recipes as a JSON response
   res.status(200).json(results);
  }
 });
});

// get recent recipes
app.get("/recent_recipes", (req, res) => {
 const limit = 5; // Number of recent recipes to fetch

 // SQL query to select the 5 most recent recipes
 const query = `
        SELECT *
        FROM CookEase.recipe 
        ORDER BY post_time DESC 
        LIMIT ?;
    `;

 // Execute the SQL query with the specified limit
 db.query(query, [limit], (error, results) => {
  if (error) {
   console.error("Error fetching recent recipes:", error);
   // Handle the error here, e.g., send an error response
   res.status(500).json({ error: "Error fetching recent recipes" });
  } else {
   // Send the retrieved recent recipes as a JSON response
   res.status(200).json(results);
  }
 });
});

// app.get("/featured_recipes", (req, res) => {
// }

// get bookmarked recipes
app.post("/bookmarks", (req, res) => {
 const { user_id } = req.body;
 const q = "SELECT * FROM CookEase.saved_recipe where user_id = ?";
 db.query(q, [user_id], (err, data) => {
  if (err) {
   console.error("Error fetching bookmarks:", err);
   res.status(500).json({ error: "Error fetching bookmarks" });
  } else {
   res.status(200).json(data);
  }
 });
});

// get recipeInfo by id
// name, intro, instruction, cookingTime, cuisine, imageurl, likecount, commentcount
app.get("/recipe/:id", (req, res) => {
 const recipeId = req.params.id;
 const q1 = "SELECT * FROM CookEase.recipe where recipe_id=(?)";
 const q2 =
  "SELECT cuisine_name as cuisine FROM CookEase.cuisine where cuisine_id=(?)";
 const q3 =
  "SELECT media_url as imageUrl FROM CookEase.media where recipe_id=(?)";
 const q4 =
  "SELECT count(id) as likeCount FROM CookEase.recipe_reaction where type='like' and recipe_id=(?)";
 const q5 =
  "SELECT count(id) as commentCount FROM CookEase.recipe_comment where recipe_id=(?)";

 const result = {};

 db.query(q1, [recipeId], (err, data) => {
  if (err) {
   return next(err);
  }

  result.recipeId = data[0].recipe_id;
  result.name = data[0].name;
  result.cuisineId = data[0].cuisine_id;
  result.description = data[0].description;
  result.cookingTime = data[0].cooking_time;

  const { cuisineId } = result;

  db.query(q2, [cuisineId], (err, data) => {
   if (err) {
    return next(err);
   }

   result.cuisine = data[0].cuisine;

   db.query(q3, [recipeId], (err, data) => {
    if (err) {
     return next(err);
    }

    result.imageUrl = data[0].imageUrl;

    db.query(q4, [recipeId], (err, data) => {
     if (err) {
      return next(err);
     }

     result.likeCount = data[0].likeCount;

     db.query(q5, [recipeId], (err, data) => {
      if (err) {
       return res.json(err);
      }

      result.commentCount = data[0].commentCount;

      return res.json(result);
     });
    });
   });
  });
 });
});

const addIngredients = (ingredients, recipeId) => {
 ingredients.forEach((ingredient) => {
  const selectQuery =
   "SELECT ingredient_id FROM CookEase.ingredient WHERE ingredient_name = ?";

  db.query(selectQuery, [ingredient], (selectErr, selectData) => {
   if (selectErr) {
    console.error("Error selecting ingredient:", selectErr);
    // Handle the error here
   } else {
    if (selectData.length === 0) {
     // Ingredient doesn't exist, insert it
     const insertIngredientQuery =
      "INSERT INTO CookEase.ingredient (ingredient_name) VALUES (?)";

     db.query(insertIngredientQuery, [ingredient], (insertErr, insertData) => {
      if (insertErr) {
       console.error("Error inserting ingredient:", insertErr);
       // Handle the error here
      } else {
       const ingredientId = insertData.insertId;
       const insertRecipeIngredientQuery =
        "INSERT INTO CookEase.recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)";

       db.query(
        insertRecipeIngredientQuery,
        [recipeId, ingredientId],
        (recipeIngredientErr) => {
         if (recipeIngredientErr) {
          console.error(
           "Error inserting recipe ingredient:",
           recipeIngredientErr
          );
          // Handle the error here
         }
        }
       );
      }
     });
    } else {
     // Ingredient already exists, insert the recipe-ingredient relationship
     const ingredientId = selectData[0].ingredient_id;
     const insertRecipeIngredientQuery =
      "INSERT INTO CookEase.recipe_ingredient (recipe_id, ingredient_id) VALUES (?, ?)";

     db.query(
      insertRecipeIngredientQuery,
      [recipeId, ingredientId],
      (recipeIngredientErr) => {
       if (recipeIngredientErr) {
        console.error(
         "Error inserting recipe ingredient:",
         recipeIngredientErr
        );
        // Handle the error here
       }
      }
     );
    }
   }
  });
 });
};

const addInstructionSteps = (steps, recipeId) => {
 steps.forEach((step, index) => {
  const q =
   "INSERT INTO CookEase.instruction_steps (recipe_id, step_number, step_description) VALUES (?, ?, ?)";
  db.query(q, [recipeId, index + 1, step], (error, results) => {
   if (error) {
    console.error("Error inserting instruction step:", error);
   }
  });
 });
};

const addImage = (image, recipeId) => {
 const q =
  "INSERT INTO CookEase.media (recipe_id, media_type, media_url) VALUES (?, ?, ?)";
 db.query(q, [recipeId, "image", image], (err, result) => {
  if (err) {
   console.error("Error inserting image:", err);
   // Handle the error here
  } else {
   //    console.log("Image inserted successfully.");
   // You can perform any additional actions on success here
  }
 });
};

const addUserRecipe = (userId, recipeId) => {
 const q = "insert into CookEase.user_recipe (user_id,recipe_id) values (?,?)";
 db.query(q, [userId, recipeId], (err, result) => {
  if (err) console.error(err);
  else {
  }
 });
};

//add recipe
app.post("/add_recipe", (req, res) => {
 const q =
  "insert into recipe(`name`,`cuisine_id`,`description`,`cooking_time`) values(?)";
 const values = [
  req.body.name,
  req.body.cuisine_id,
  req.body.description,
  req.body.cooking_time,
 ];
 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  const recipeId = data.insertId;
  addImage(req.body.image, recipeId);
  addIngredients(req.body.ingredients, recipeId);
  addInstructionSteps(req.body.instructions, recipeId);
  addUserRecipe(req.body.user_id, recipeId);
  return res.json({ recipe_id: data.insertId });
 });
});

// add cooksnap
app.post("/add_cooksnap", (req, res) => {
 const { recipe_id, user_id, cooksnap_url, caption } = req.body;
 const q =
  "insert into CookEase.cooksnap(recipe_id,user_id,cooksnap_url,caption) values(?,?,?,?)";
 const values = [recipe_id, user_id, cooksnap_url, caption];
 db.query(q, values, (err, data) => {
  if (err) return res.json(err);
  return res.json({ cooksnap_id: data.insertId });
 });
});

// get cooksnaps
app.get("/get_cooksnaps", (req, res) => {
 const q =
  "SELECT * FROM CookEase.cooksnap order by cooksnap_time desc limit 5;";
 db.query(q, (error, results) => {
  if (error) {
   console.error("Error retrieving snaps:", error);
   res.status(500).json({ error: "Error retrieving snaps" });
  } else {
   res.status(200).json(results);
  }
 });
});

// get all cuisines
app.get("/get_cuisines", (req, res) => {
 const q = "SELECT * FROM CookEase.cuisine";
 db.query(q, (error, results) => {
  if (error) {
   console.error("Error retrieving cuisines:", error);
   // Handle the error here, e.g., send an error response
   res.status(500).json({ error: "Error retrieving cuisines" });
  } else {
   // Send the retrieved cuisines as a JSON response
   res.status(200).json(results);
  }
 });
});

app.get("/get_events", (req, res) => {
 const q1 = "SELECT * FROM CookEase.contest";
 const q2 =
  "SELECT contest_id, COUNT(*) AS participants FROM CookEase.user_contest WHERE contest_id = ?";

 db.query(q1, (error, contestResults) => {
  if (error) {
   console.error("Error retrieving contests:", error);
   res.status(500).json({ error: "Error retrieving contests" });
  } else {
   const contestsWithParticipants = [];

   const fetchParticipants = (contestIndex) => {
    if (contestIndex < contestResults.length) {
     const contest = contestResults[contestIndex];
     const contestId = contest.contest_id;

     db.query(q2, [contestId], (participantError, participantResults) => {
      if (participantError) {
       console.error(
        `Error retrieving participants for contest ${contestId}:`,
        participantError
       );
      } else {
       contest.participants = participantResults[0].participants;
      }
      fetchParticipants(contestIndex + 1);
     });
    } else {
     res.status(200).json(contestResults);
    }
   };
   fetchParticipants(0);
  }
 });
});

app.post("/add_event", (req, res) => {
 const { contest_name, contest_time, contest_venue } = req.body;
 const { user_id } = req.body;
 const q =
  "insert into CookEase.contest (contest_name,contest_time,contest_venue) values (?,?,?)";
 db.query(q, [contest_name, contest_time, contest_venue], (error, results) => {
  if (error) {
   console.error("Error retrieving cuisines:", error);
   // Handle the error here, e.g., send an error response
   res.status(500).json({ error: "Error retrieving cuisines" });
  } else {
   const contestId = results.insertId;
   const q = "insert into CookEase.user_contest values (?,?)";
   db.query(q, [user_id, contestId], (err, data) => {
    if (err) {
     console.error(err);
     return res.status(500).json(err);
    }
    return res.status(200).json("contest added");
   });
  }
 });
});

app.post("/has_user_participated", async (req, res) => {
 const { user_id, contest_id } = req.body;
 const q =
  "SELECT * FROM CookEase.user_contest where user_id = ? and contest_id = ?";
 try {
  const response = await queryDatabase(q, [user_id, contest_id]);
  const formData = {
   participated: response.length !== 0,
  };
  return res.json(formData);
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.post("/participate", (req, res) => {
 const { user_id, contest_id } = req.body;
 const q = "insert into CookEase.user_contest values(?,?)";
 try {
  db.query(q, [user_id, contest_id]);
  return res.json(`${user_id} participated ${contest_id}`);
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.post("/departicipate", (req, res) => {
 const { user_id, contest_id } = req.body;
 const q =
  "delete from CookEase.user_contest where user_id = ? and contest_id = ?";
 try {
  db.query(q, [user_id, contest_id]);
  return res.json(`${user_id} departicipated ${contest_id}`);
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.get("/get_user_from_recipe/:id", (req, res) => {
 const recipeId = req.params.id;
 const q = `SELECT su.user_id, su.first_name, su.last_name, su.profile_pic_url
   FROM CookEase.site_user AS su
   JOIN CookEase.user_recipe AS ur ON su.user_id = ur.user_id
   WHERE ur.recipe_id = ?;`;
 try {
  db.query(q, [recipeId], (err, data) => {
   if (err) throw err;
   return res.status(200).json(data[0]);
  });
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

// get post stat of the user
app.post("/post_stat", async (req, res) => {
 const { user_id, recipe_id } = req.body;
 //  console.log(user_id, recipe_id);

 const q1 =
  "SELECT COUNT(*) AS liked FROM CookEase.recipe_reaction WHERE user_id = ? AND recipe_id = ?";
 const q2 =
  "SELECT COUNT(*) AS saved FROM CookEase.saved_recipe WHERE user_id = ? AND recipe_id = ?";

 try {
  const likedData = await queryDatabase(q1, [user_id, recipe_id]);
  const savedData = await queryDatabase(q2, [user_id, recipe_id]);

  const formData = {
   liked: likedData[0].liked !== 0,
   saved: savedData[0].saved !== 0,
  };

  //   console.log(formData);
  return res.json(formData);
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.post("/is_user_following", async (req, res) => {
 const { p_follower, p_followed } = req.body;
 const q =
  "SELECT * FROM CookEase.follow where following_user_id = ? and followed_user_id = ?";
 try {
  const response = await queryDatabase(q, [p_follower, p_followed]);
  const formData = {
   following: response.length !== 0,
  };
  return res.json(formData);
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.post("/posts", (req, res) => {
 const { user_id } = req.body;
 const q =
  "SELECT * from CookEase.recipe where recipe_id in (SELECT recipe_id FROM CookEase.user_recipe where user_id in (SELECT followed_user_id FROM CookEase.follow where following_user_id = ?)) order by post_time desc;";
 try {
  db.query(q, [user_id], (err, data) => {
   if (err) throw err;
   return res.status(200).json(data);
  });
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

// get user stats
// posts, followers, following
app.get("/user_stat/:id", async (req, res) => {
 const user_id = req.params.id;
 const q1 =
  "SELECT count(recipe_id) as posts FROM CookEase.user_recipe where user_id=?"; // posts
 const q2 =
  "SELECT count(followed_user_id) as followers FROM CookEase.follow where followed_user_id = ?"; // followers
 const q3 =
  "SELECT count(following_user_id) as followings FROM CookEase.follow where following_user_id = ?"; // following

 try {
  const [postsData] = await queryDatabase(q1, [user_id]);
  const [followersData] = await queryDatabase(q2, [user_id]);
  const [followingsData] = await queryDatabase(q3, [user_id]);

  const formData = {
   posts: postsData.posts,
   followers: followersData.followers,
   followings: followingsData.followings,
  };

  //   console.log(formData);
  return res.json(formData);
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.get("/user_recipe/:id", async (req, res) => {
 const user_id = req.params.id;
 const q = "SELECT * FROM CookEase.user_recipe where user_id = ?;";
 try {
  db.query(q, [user_id], (err, data) => {
   if (err) throw err;
   res.json(data);
  });
 } catch (err) {
  console.error(err);
  res.json(err);
 }
});

app.post("/follow", (req, res) => {
 const { following, followed } = req.body;
 const q = "insert into CookEase.follow values(?,?)";
 try {
  db.query(q, [following, followed]);
  return res.json("following...");
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

app.post("/unfollow", (req, res) => {
 const { following, followed } = req.body;
 const q =
  "delete from CookEase.follow where following_user_id = ? and followed_user_id = ?";
 try {
  db.query(q, [following, followed]);
  return res.json("following...");
 } catch (err) {
  console.error("Error:", err);
  return res.status(500).json({ error: "An error occurred" });
 }
});

// reaction on recipe
app.post("/add_post_reaction", (req, res) => {
 const q =
  "insert into CookEase.recipe_reaction(type,user_id,recipe_id) values ('like',?,?)";
 db.query(q, [req.body.user_id, req.body.recipe_id], (err, data) => {
  if (err) {
   console.error(err);
   res.status(500).json(err);
  } else {
   res.status(200).json("reaction added");
  }
 });
});

app.post("/rmv_post_reaction", (req, res) => {
 const q =
  "delete from CookEase.recipe_reaction where user_id = ? and recipe_id = ?";
 db.query(q, [req.body.user_id, req.body.recipe_id], (err, data) => {
  if (err) {
   console.error(err);
   res.status(500).json(err);
  } else {
   res.status(200).json("reaction removed");
  }
 });
});

// bookmark post
app.post("/save_post", (req, res) => {
 const q = "insert into CookEase.saved_recipe(user_id,recipe_id) values (?,?)";
 db.query(q, [req.body.user_id, req.body.recipe_id], (err, data) => {
  if (err) {
   console.error(err);
   res.status(500).json(err);
  } else {
   res.status(200).json("post bookmarked");
  }
 });
});

// remove from bookmarked post
app.post("/remove_saved_post", (req, res) => {
 const q =
  "delete from CookEase.saved_recipe where user_id = ? and recipe_id = ?";
 db.query(q, [req.body.user_id, req.body.recipe_id], (err, data) => {
  if (err) {
   console.error(err);
   res.status(500).json(err);
  } else {
   res.status(200).json("post removed from bookmark");
  }
 });
});

// get user from recipe_id
app.get("/user_by_recipe/:id", (req, res) => {
 const recipeId = req.params.id;
 const q =
  "SELECT q.user_id,q.first_name,q.last_name,q.email,q.profile_pic_url,q.is_active FROM CookEase.user_recipe as p inner join CookEase.site_user as q where p.user_id = q.user_id and p.recipe_id=(?)";
 db.query(q, [recipeId], (err, data) => {
  if (err) return res.json(err);
  return res.json(data[0]);
 });
});

app.post("/add_comment", (req, res) => {
 const { recipe_id, user_id, comment_text } = req.body;
 const q =
  "insert into CookEase.recipe_comment(recipe_id,user_id,comment_text) values (?,?,?)";
 db.query(q, [recipe_id, user_id, comment_text], (err, data) => {
  if (err) return res.json(err);
  return res.json("comment added");
 });
});

app.post("/add_cooksnap_comment", (req, res) => {
 const { cooksnap_id, user_id, comment_text } = req.body;
 const q =
  "insert into CookEase.cooksnap_comment(cooksnap_id,user_id,comment_text) values (?,?,?)";
 db.query(q, [cooksnap_id, user_id, comment_text], (err, data) => {
  if (err) return res.json(err);
  return res.json("comment added");
 });
});

app.get("/comments_by_post/:id", (req, res) => {
 const recipeId = req.params.id;
 const q1 =
  "SELECT user_id, comment_text, comment_time FROM CookEase.recipe_comment WHERE recipe_id = ?";
 const q2 =
  "SELECT first_name, last_name FROM CookEase.site_user WHERE user_id = ?";

 const result = [];

 db.query(q1, [recipeId], (err, comments) => {
  if (err) {
   return next(err);
  }

  // If there are no comments, return an empty array
  if (comments.length === 0) {
   return res.json(result);
  }

  let processedComments = 0;

  comments.forEach((comment) => {
   db.query(q2, [comment.user_id], (err, user) => {
    if (err) {
     return res.json(err);
    }

    const commentWithUser = {
     user: {
      user_id: comment.user_id,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
     },
     comment: {
      comment_text: comment.comment_text,
      comment_time: comment.comment_time,
     },
    };

    result.push(commentWithUser);

    processedComments++;

    if (processedComments === comments.length) {
     return res.json(result);
    }
   });
  });
 });
});

app.get("/comments_by_cooksnap/:id", (req, res) => {
 const cooksnapId = req.params.id;
 const q1 =
  "SELECT user_id, comment_text, comment_time FROM CookEase.cooksnap_comment WHERE cooksnap_id = ?";
 const q2 =
  "SELECT first_name, last_name FROM CookEase.site_user WHERE user_id = ?";

 const result = [];

 db.query(q1, [cooksnapId], (err, comments) => {
  if (err) {
   return next(err);
  }

  // If there are no comments, return an empty array
  if (comments.length === 0) {
   return res.json(result);
  }

  let processedComments = 0;

  comments.forEach((comment) => {
   db.query(q2, [comment.user_id], (err, user) => {
    if (err) {
     return res.json(err);
    }

    const commentWithUser = {
     user: {
      user_id: comment.user_id,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
     },
     comment: {
      comment_text: comment.comment_text,
      comment_time: comment.comment_time,
     },
    };

    result.push(commentWithUser);

    processedComments++;

    if (processedComments === comments.length) {
     return res.json(result);
    }
   });
  });
 });
});

// get steps of a recipe
app.get("/steps/:id", (req, res) => {
 const recipeId = req.params.id;
 const q =
  "SELECT step_number,step_description FROM CookEase.instruction_steps where recipe_id=(?) order by step_number";
 db.query(q, [recipeId], (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});

// get ingredients of a recipe
app.get("/ingredients/:id", (req, res) => {
 const recipeId = req.params.id;
 const q =
  "SELECT ingredient_name FROM CookEase.recipe_ingredient natural join CookEase.ingredient where recipe_id=(?)";
 db.query(q, [recipeId], (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});

// File upload
app.post("/upload", upload.single("file"), (req, res) => {
 if (!req.file) {
  return res.status(400).send("No file uploaded.");
 }
 const filename = req.file.filename;
 return res.json(filename);
});

// Serve uploaded images
app.get("/images/:filename", async (req, res) => {
 const { filename } = req.params;
 const filePath = path.join(__dirname, "uploads", filename);

 try {
  const fileContent = await fs.readFile(filePath);
  res.setHeader("Content-Type", "image/jpeg"); // Modify according to your image type
  res.send(fileContent);
 } catch (error) {
  res.status(404).send("Image not found");
 }
});
