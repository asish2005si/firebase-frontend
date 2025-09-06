
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
                "Dadar": "SBIN0000353",
                "Goregaon": "SBIN0001266",
            },
            "Pune": {
                "Camp": "SBIN0000454",
                "Kothrud": "SBIN0002100",
                "Aundh": "SBIN0004887",
                "Hinjewadi": "SBIN0011487"
            },
            "Nagpur": {
                "Civil Lines": "SBIN0000432",
                "Sitabuldi": "SBIN0000433"
            }
        },
        "Delhi": {
            "New Delhi": {
                "Connaught Place": "SBIN0000691",
                "Chandni Chowk": "SBIN0000631",
                "Karol Bagh": "SBIN0000699",
                "South Extension": "SBIN0001272"
            }
        },
        "Karnataka": {
            "Bengaluru": {
                "MG Road": "SBIN0000813",
                "Koramangala": "SBIN0004328",
                "Indiranagar": "SBIN0003301",
                "Jayanagar": "SBIN0003286"
            },
            "Mysuru": {
                "Main Branch": "SBIN0000876",
                "Saraswathipuram": "SBIN0001730"
            }
        },
        "West Bengal": {
            "Kolkata": {
                "Park Street": "SBIN0000150",
                "Salt Lake": "SBIN0001612",
                "Howrah": "SBIN0000091",
                "Ballygunge": "SBIN0001802"
            }
        }
    },
    "HDFC Bank": {
        "Maharashtra": {
            "Mumbai": {
                "Nariman Point": "HDFC0000001",
                "Powai": "HDFC0000245",
                "Chembur": "HDFC0000127",
                "Vashi": "HDFC0000169"
            },
            "Pune": {
                "FC Road": "HDFC0000103",
                "Hinjewadi": "HDFC0000737",
                "Kalyani Nagar": "HDFC0000527"
            }
        },
        "Karnataka": {
            "Bengaluru": {
                "Koramangala": "HDFC0000175",
                "Indiranagar": "HDFC0000184",
                "Whitefield": "HDFC0000572",
                "HSR Layout": "HDFC0000521"
            }
        },
        "Delhi": {
            "New Delhi": {
                "Greater Kailash": "HDFC0000021",
                "Vasant Vihar": "HDFC0000063",
                "Lajpat Nagar": "HDFC0000109"
            }
        }
    },
    "ICICI Bank": {
        "Maharashtra": {
            "Mumbai": {
                "Bandra Kurla Complex": "ICIC0000104",
                "Lower Parel": "ICIC0000024",
                "Andheri": "ICIC0000004",
                "Thane": "ICIC0000019"
            }
        },
        "Tamil Nadu": {
            "Chennai": {
                "T Nagar": "ICIC0000004",
                "Anna Nagar": "ICIC0000156",
                "Adyar": "ICIC0000018",
                "Velachery": "ICIC0000450"
            }
        },
        "Gujarat": {
            "Ahmedabad": {
                "C G Road": "ICIC0000021",
                "Maninagar": "ICIC0000115",
                "Satellite": "ICIC0000263"
            }
        },
        "Karnataka": {
            "Bengaluru": {
                "Electronic City": "ICIC0000203",
                "Marathahalli": "ICIC0000204",
                "Malleshwaram": "ICIC0000234"
            }
        }
    },
    "Axis Bank": {
        "Delhi": {
            "New Delhi": {
                "Greater Kailash": "UTIB0000007",
                "Saket": "UTIB0000047",
                "Dwarka": "UTIB0000230",
                "Rohini": "UTIB0000392"
            }
        },
        "Karnataka": {
            "Bengaluru": {
                "MG Road": "UTIB0000009",
                "Jayanagar": "UTIB0000051",
                "Yelahanka": "UTIB0000720",
                "Bannerghatta Road": "UTIB0000615"
            }
        },
        "Gujarat": {
            "Surat": {
                "Adajan": "UTIB0000222",
                "Ring Road": "UTIB0000048"
            }
        }
    },
    "Kotak Mahindra Bank": {
        "Maharashtra": {
            "Mumbai": {
                "Fort": "KKBK0000651",
                "Juhu": "KKBK0000654",
                "Malad": "KKBK0000661",
                "Worli": "KKBK0000653"
            }
        },
        "Rajasthan": {
            "Jaipur": {
                "C Scheme": "KKBK0000261",
                "MI Road": "KKBK0000262",
                "Vaishali Nagar": "KKBK0003531"
            }
        },
        "Telangana": {
            "Hyderabad": {
                "Banjara Hills": "KKBK0000551",
                "Jubilee Hills": "KKBK0000552",
                "Gachibowli": "KKBK0007460"
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
            },
            "Chandigarh": {
                "Sector 17": "PUNB0002100",
                "Sector 35": "PUNB0002200"
            }
        },
        "Uttar Pradesh": {
            "Lucknow": {
                "Hazratganj": "PUNB0002900",
                "Alambagh": "PUNB0003000"
            },
            "Noida": {
                "Sector 18": "PUNB0108400",
                "Sector 62": "PUNB0406400"
            }
        }
    },
    "Bank of Baroda": {
        "Gujarat": {
            "Vadodara": {
                "Mandvi": "BARB0MANDVI",
                "Alkapuri": "BARB0ALKAPU",
                "Sayajigunj": "BARB0SAYAJI"
            },
            "Ahmedabad": {
                "Navrangpura": "BARB0NAVRA",
                "Ashram Road": "BARB0ASHRAM"
            }
        },
        "Maharashtra": {
            "Mumbai": {
                "Zaveri Bazar": "BARB0ZAVERI",
                "Ghatkopar": "BARB0GHATKO"
            }
        }
    },
    "Canara Bank": {
        "Karnataka": {
            "Bengaluru": {
                "Town Hall": "CNRB0000400",
                "Basavanagudi": "CNRB0000401",
                "Malleswaram": "CNRB0000402"
            },
            "Mangaluru": {
                "Hampankatta": "CNRB0000600",
                "Lalbagh": "CNRB0000601"
            }
        },
        "Kerala": {
            "Thiruvananthapuram": {
                "MG Road": "CNRB0000800",
                "Pattom": "CNRB0000801"
            }
        }
    }
};
