
const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
// const { jsonData } = require('./excel')
const data = JSON.parse(fs.readFileSync('exported_data.json', 'utf8'))
const mongoURI = process.env.MONGODB_URL
const bodyParser = require('body-parser');

const app = express()

app.use(express.json())
mongoose.connect("mongodb+srv://srengine:srengine_ksv@srengine.eic6ia5.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.static('public'));
app.use(bodyParser.json());

const connection = mongoose.connection;
connection.once('open', function () {
  console.log("Mongoose Server up")
});
const studentSchema = new mongoose.Schema
(
    {
    "#":
    {
        type: String,
        
    },
    "Name":
    {
        type: String,
        
    },

    "Regn Num":
    {
        type: String,
        
    },

    "Branch":
    {
        type: String,
        
    },

    "Solved Count":
    {
        type: String,
        
    },
    "Score":
    {
        type: String,
        
    },
    "Total Submissions":
    {
        type: String,
        
    },
    "Email":
    {
        type: String,
        
    },
    "Phone":
    {
        type: String,
        
    },
    "Mentor":
    {
        type: String,
        
    },
    "Batch/Section":
    {
        type: String,
        
    },
    "Batch":
    {
        type: String,
        
    },
    "College":
    {
        type: String,
        
    },
    "IP Address":
    {
        type: String,
        
    },
    "Resume Count":
    {
        type: String,
        
    },
    "Usage Time":
    {
        type: String,
        
    },
    "Active Utilization":{
        type: String,
        
   }
}
)
const Student = mongoose.model("Student", studentSchema);

async function d(){
  try {
    
       await Student.create(data)
       console.log('data successfully imported')
       process.exit()
  } catch (error) {
    console.log('error', error)
  }
}





const PORT = process.env.PORT || 5000


app.get('/success',(req,res)=>{
    res.send(data);
});

app.post('/success',(req,res)=>{
    
    d();

    res.send(req.body);
});

app.get('/', (req, res) => {
    res.sendFile('./index.html');
});

app.listen(PORT, () => console.log(`listening to port ${PORT}`))

