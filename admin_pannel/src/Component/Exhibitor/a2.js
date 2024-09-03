import mongoose from "mongoose";

const ExhibitorsSchema = new mongoose.Schema(
    {
        User_FK: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        FullName: { type: String, required: true },
        Job_Title: { type: String, required: true },
        Company_Name: { type: String, required: true },
        Company_Address: { type: String, required: true },
        Document: { type: String},
        logo: { type: String },
        Profile: {
            description: { type: String, },
            product: { type: String, },
            email: { type: String,  },
            contact: { type: String,  },
            website: { type: String, },
        },
        Staff: [
            {
                name: { type: String,  },
                email: { type: String,  },
                contact: { type: String, },
            }
        ],
        Created_at: { type: Date, default: Date.now, required: true },
    }
);

const ExhibitorsModel = mongoose.model('Exhibitors', ExhibitorsSchema);

export default ExhibitorsModel;