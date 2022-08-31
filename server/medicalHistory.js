const history = [
    {
        "_id":"01",
        "userId":"2",
        medicalHistory:{
            "1998": "Diagnosed with hypertension and began on unknown medication. Stopped after 6 months because of drowsiness. ",
            "1990": "Diagnosed with peptic ulcer disease, which resolved after three months on cimetidine. She describes no history of cancer, lung disease or previous heart disease",
            "1994":" Bunionectomy(Surgical)"
        },
        surgicalHistory:{
            "Operations" : "appendectomy at age 12",
        },
        allergies:{
            "Penicillin" : "experienced rash and hives in 1985"
        }
    },
    {
        "_id":"02",
        "userId":"1",
            
        medicalHistory:{
            "2009": "Health Screening: colonoscopy at LUMC , no polyps ",
            "2016": "Immunizations – tetanus booster",
        },
        surgicalHistory:{
            "Operations": "appendectomy at age 12"
    },
        allergies:{
            "Penicillin" : "Drug Reactions: was told that he was allergic to penicillin as a child, but knows no further details"
        }
    }


]


module.exports = {history};