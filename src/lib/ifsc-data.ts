
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
        }
    }
};
