//
//  HomeViewController.swift
//  BrownfieldHost
//

import UIKit

class HomeViewController: UIViewController {

    private let reactVC = ReactViewController(
        moduleName: "HomeScreen",
        initialProps: [
            "name": "Alex Morgan",
            "email": "alex@example.com",
            "role": "Mobile Engineer",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy"
        ]
    )

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Home"
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
