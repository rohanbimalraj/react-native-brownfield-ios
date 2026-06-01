//
//  UserNativeService.swift
//  BrownfieldHost
//

import Foundation
import UIKit

@objc(UserNativeService)
final class UserNativeService: NSObject {

    @objc static let shared = UserNativeService()
    private override init() {}

    // Set by RCTNativeUserModule when the JSI bridge initialises
    @objc var emit: (([String: Any]) -> Void)?

    // Called by any VC to push an event to RN
    func send(_ event: NativeEvent) {
        emit?(["name": event.name, "data": event.data])
    }

    // MARK: - Data methods (called by RCTNativeUserModule)

    @objc func getPhoneNumber() -> String {
        return "+91 98765 43210"
    }

    @objc func getDeviceId(completion: @escaping (String) -> Void) {
        DispatchQueue.global().asyncAfter(deadline: .now() + 2) {
            let deviceId = UIDevice.current.identifierForVendor?.uuidString ?? "unknown"
            completion(deviceId)
        }
    }
}
