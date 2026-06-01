//
//  FavouriteViewController.swift
//  BrownfieldHost
//

import UIKit

class FavouriteViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        title = "Favourites"

        let label = UILabel()
        label.text = "Favourites"
        label.font = .systemFont(ofSize: 24, weight: .semibold)
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)

        let button = UIButton(type: .system)
        button.setTitle("Send Pincode to RN", for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 16, weight: .semibold)
        button.backgroundColor = UIColor(red: 99/255, green: 102/255, blue: 241/255, alpha: 1)
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 10
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(sendPincode), for: .touchUpInside)
        view.addSubview(button)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button.topAnchor.constraint(equalTo: label.bottomAnchor, constant: 24),
            button.widthAnchor.constraint(equalToConstant: 220),
            button.heightAnchor.constraint(equalToConstant: 44),
        ])
    }

    @objc private func sendPincode() {
        UserNativeService.shared.send(.pincodeUpdated(pincode: "560001"))
    }
}
