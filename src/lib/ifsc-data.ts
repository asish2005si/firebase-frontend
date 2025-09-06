
// This is a mock data structure for demonstration purposes.
// In a real application, this data would come from a database or a reliable API.
type BankData = {
    [bank: string]: {
      [state: string]: {
        [city: string]: {
          [branch: string]: string; // IFSC Code
        };
      };
    };
  };
  
export const bankData: BankData = {
    "State Bank of India": {
        "Maharashtra": {
            "Mumbai": {
                "Fort": "SBIN0000300",
                "Andheri East": "SBIN0000539",
                "Bandra West": "SBIN0000538",
            },
            "Pune": {
                "Camp": "SBIN0000454",
                "Kothrud": "SBIN0002100",
            }
        },
        "Delhi": {
            "New Delhi": {
                "Connaught Place": "SBIN0000691",
                "Chandni Chowk": "SBIN0000631",
            }
        },
        "West Bengal": {
            "Kolkata": {
                "Park Street": "SBIN0000150",
                "Salt Lake": "SBIN0001612"
            }
        }
    },
    "HDFC Bank": {
        "Maharashtra": {
            "Mumbai": {
                "Nariman Point": "HDFC0000001",
                "Powai": "HDFC0000245",
            },
            "Pune": {
                "FC Road": "HDFC0000103",
                "Hinjewadi": "HDFC0000737",
            }
        },
        "Karnataka": {
            "Bengaluru": {
                "Koramangala": "HDFC0000175",
                "Indiranagar": "HDFC0000184",
                "Whitefield": "HDFC0000572"
            }
        }
    },
    "ICICI Bank": {
        "Maharashtra": {
            "Mumbai": {
                "Bandra Kurla Complex": "ICIC0000104",
                "Lower Parel": "ICIC0000024",
            }
        },
        "Tamil Nadu": {
            "Chennai": {
                "T Nagar": "ICIC0000004",
                "Anna Nagar": "ICIC0000156",
            }
        },
        "Gujarat": {
            "Ahmedabad": {
                "C G Road": "ICIC0000021",
                "Maninagar": "ICIC0000115"
            }
        }
    },
    "Axis Bank": {
        "Delhi": {
            "New Delhi": {
                "Greater Kailash": "UTIB0000007",
                "Saket": "UTIB0000047"
            }
        },
        "Karnataka": {
            "Bengaluru": {
                "MG Road": "UTIB0000009",
                "Jayanagar": "UTIB0000051"
            }
        }
    },
    "Kotak Mahindra Bank": {
        "Maharashtra": {
            "Mumbai": {
                "Fort": "KKBK0000651",
                "Juhu": "KKBK0000654"
            }
        },
        "Rajasthan": {
            "Jaipur": {
                "C Scheme": "KKBK0000261",
                "MI Road": "KKBK0000262"
            }
        }
    },
    "Punjab National Bank": {
        "Punjab": {
            "Amritsar": {
                "Hall Bazar": "PUNB0000100",
                "Lawrence Road": "PUNB0000200"
            },
            "Ludhiana": {
                "Miller Ganj": "PUNB0001300",
                "Model Town": "PUNB0001500"
            }
        },
        "Uttar Pradesh": {
            "Lucknow": {
                "Hazratganj": "PUNB0002900",
                "Alambagh": "PUNB0003000"
            }
        }
    }
};
