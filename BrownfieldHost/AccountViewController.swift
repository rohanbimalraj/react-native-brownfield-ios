//
//  AccountViewController.swift
//  BrownfieldHost
//

import UIKit

class AccountViewController: UIViewController {

    private let reactVC = ReactViewController(moduleName: "AccountScreen")

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Account"
        embedReactViewController()
    }

    private func embedReactViewController() {
        addChild(reactVC)
        reactVC.view.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(reactVC.view)
        NSLayoutConstraint.activate([
            reactVC.view.topAnchor.constraint(equalTo: view.topAnchor),
            reactVC.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            reactVC.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            reactVC.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        reactVC.didMove(toParent: self)
    }
}
