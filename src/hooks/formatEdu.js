import React from 'react'

export default function formatEdu(education) {
    

    switch(education) {
        case "htx":
            return "HTX"
        case "ggr":
            return "Grafisk Tekninker"
        case "h3g":
            return education // ! not done
        case "gmg":
            return "Mediegrafiker"
        case "h3m":
            return education // ! not done
        case "gwe":
            return "Webintegrator"
        case "h0m":
            return education // ! not done
        case "h0g":
            return education // ! not done
        case "h1w":
            return "Webudvikler"
        default:
            return education
    }

}
