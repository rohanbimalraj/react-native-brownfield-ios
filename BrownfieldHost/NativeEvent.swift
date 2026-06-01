//
//  NativeEvent.swift
//  BrownfieldHost
//

import Foundation

enum NativeEvent {
    case pincodeUpdated(pincode: String)

    var name: String {
        switch self {
        case .pincodeUpdated: return "pincodeUpdated"
        }
    }

    var data: [String: Any] {
        switch self {
        case .pincodeUpdated(let pincode):
            return ["pincode": pincode]
        }
    }
}
