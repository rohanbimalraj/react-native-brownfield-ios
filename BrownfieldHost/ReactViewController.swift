//
//  ReactViewController.swift
//  BrownfieldHost
//

import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

// MARK: - ReactNativeHost (Singleton)
// One factory = one bridge shared across all RN screens.
// This ensures a single JS engine and shared Redux store.

final class ReactNativeHost {
    static let shared = ReactNativeHost()

    let factory: RCTReactNativeFactory
    private let delegate: ReactNativeDelegate

    private init() {
        delegate = ReactNativeDelegate()
        delegate.dependencyProvider = RCTAppDependencyProvider()
        factory = RCTReactNativeFactory(delegate: delegate)
    }
}

// MARK: - ReactViewController

class ReactViewController: UIViewController {

    let moduleName: String
    var initialProps: [String: Any]?

    init(moduleName: String, initialProps: [String: Any]? = nil) {
        self.moduleName = moduleName
        self.initialProps = initialProps
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white

        let rnView = ReactNativeHost.shared.factory.rootViewFactory.view(
            withModuleName: moduleName,
            initialProperties: initialProps
        )

        rnView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(rnView)

        NSLayoutConstraint.activate([
            rnView.topAnchor.constraint(equalTo: view.topAnchor),
            rnView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            rnView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            rnView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
}

// MARK: - ReactNativeDelegate

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
    override func sourceURL(for bridge: RCTBridge) -> URL? {
        bundleURL()
    }

    override func bundleURL() -> URL? {
#if DEBUG
        return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
        return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
    }
}
