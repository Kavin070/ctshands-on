//60

use college_nosql



//61

db.createCollection("feedback")



//62 & 63

db.feedback.insertMany([

{
student_id:1,
course_code:"CS101",
semester:"2022-ODD",
rating:5,
comments:"Excellent teaching.",
tags:["challenging","well-structured","good-examples"],
submitted_at:new Date("2022-11-30"),
attachments:[
{
filename:"notes.pdf",
size_kb:240
}
]
},

{
student_id:2,
course_code:"CS101",
semester:"2022-ODD",
rating:4,
comments:"Very Good",
tags:["challenging","interesting"],
submitted_at:new Date("2022-11-25"),
attachments:[
{
filename:"assignment.pdf",
size_kb:150
}
]
},

{
student_id:3,
course_code:"CS101",
semester:"2022-ODD",
rating:2,
comments:"Needs Improvement",
tags:["difficult"],
submitted_at:new Date("2022-11-21")
},

{
student_id:4,
course_code:"CS102",
semester:"2022-ODD",
rating:5,
comments:"Excellent",
tags:["database","easy"],
submitted_at:new Date("2022-11-19"),
attachments:[
{
filename:"db.pdf",
size_kb:120
}
]
},

{
student_id:5,
course_code:"CS102",
semester:"2022-ODD",
rating:3,
comments:"Average",
tags:["database"],
submitted_at:new Date("2022-11-15"),
attachments:[
{
filename:"lab.pdf",
size_kb:180
}
]
},

{
student_id:6,
course_code:"EC101",
semester:"2022-ODD",
rating:5,
comments:"Nice",
tags:["electronics"],
submitted_at:new Date("2022-11-11"),
attachments:[
{
filename:"ckt.pdf",
size_kb:130
}
]
},

{
student_id:7,
course_code:"ME101",
semester:"2022-ODD",
rating:1,
comments:"Poor",
tags:["mechanics"],
submitted_at:new Date("2022-11-10"),
attachments:[
{
filename:"me.pdf",
size_kb:160
}
]
},

{
student_id:8,
course_code:"CS103",
semester:"2022-ODD",
rating:4,
comments:"Good",
tags:["oop"],
submitted_at:new Date("2022-11-12"),
attachments:[
{
filename:"oop.pdf",
size_kb:210
}
]
},

{
student_id:9,
course_code:"EC101",
semester:"2021-EVEN",
rating:2,
comments:"Average",
tags:["electronics"],
submitted_at:new Date("2021-10-10"),
attachments:[
{
filename:"ec.pdf",
size_kb:200
}
]
},

{
student_id:10,
course_code:"CS103",
semester:"2022-ODD",
rating:5,
comments:"Excellent",
tags:["programming"],
submitted_at:new Date("2022-11-18"),
attachments:[
{
filename:"code.pdf",
size_kb:170
}
]
}

])



//64

db.feedback.countDocuments()



//65

db.feedback.find(
{
rating:5
}
)



//66

db.feedback.find(
{
course_code:"CS101",
tags:"challenging"
}
)



//67

db.feedback.find(
{},
{
student_id:1,
course_code:1,
rating:1,
_id:0
}
)



//68

db.feedback.updateMany(
{
rating:
{
$lt:3
}
},
{
$set:
{
needs_review:true
}
}
)



//69

db.feedback.updateMany(
{
needs_review:true
},
{
$push:
{
tags:"reviewed"
}
}
)



//70

db.feedback.deleteMany(
{
semester:"2021-EVEN"
})



//71

db.feedback.aggregate([

{
$match:
{
semester:"2022-ODD"
}
},

{
$group:
{
_id:"$course_code",
avg_rating:
{
$avg:"$rating"
},
total_feedback:
{
$sum:1
}
}
},

{
$sort:
{
avg_rating:-1
}
}

])




//72

db.feedback.aggregate([

{
$match:
{
semester:"2022-ODD"
}
},

{
$group:
{
_id:"$course_code",
avg_rating:
{
$avg:"$rating"
},
total_feedback:
{
$sum:1
}
}
},

{
$project:
{
_id:1,
average_rating:
{
$round:["$avg_rating",1]
},
total_feedback:1
}
},

{
$sort:
{
average_rating:-1
}
}

])




//73

db.feedback.aggregate([

{
$unwind:"$tags"
},

{
$group:
{
_id:"$tags",
count:
{
$sum:1
}
}
},

{
$sort:
{
count:-1
}
}

])




//74

db.feedback.createIndex(
{
course_code:1
}
)



db.feedback.find(
{
course_code:"CS101"
}).explain("executionStats")