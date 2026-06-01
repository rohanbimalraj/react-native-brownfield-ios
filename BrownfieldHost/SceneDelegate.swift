//
//  SceneDelegate.swift
//  BrownfieldHost
//

import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        let tabBarController = UITabBarController()

        let home = UINavigationController(rootViewController: HomeViewController())
        home.tabBarItem = UITabBarItem(title: "Home", image: UIImage(systemName: "house"), selectedImage: UIImage(systemName: "house.fill"))

        let favourites = UINavigationController(rootViewController: FavouriteViewController())
        favourites.tabBarItem = UITabBarItem(title: "Favourites", image: UIImage(systemName: "heart"), selectedImage: UIImage(systemName: "heart.fill"))

        let search = UINavigationController(rootViewController: SearchViewController())
        search.tabBarItem = UITabBarItem(title: "Search", image: UIImage(systemName: "magnifyingglass"), selectedImage: UIImage(systemName: "magnifyingglass"))

        let account = UINavigationController(rootViewController: AccountViewController())
        account.tabBarItem = UITabBarItem(title: "Account", image: UIImage(systemName: "person"), selectedImage: UIImage(systemName: "person.fill"))

        tabBarController.viewControllers = [home, favourites, search, account]

        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = tabBarController
        window.makeKeyAndVisible()
        self.window = window
    }

    func sceneDidDisconnect(_ scene: UIScene) {}
    func sceneDidBecomeActive(_ scene: UIScene) {}
    func sceneWillResignActive(_ scene: UIScene) {}
    func sceneWillEnterForeground(_ scene: UIScene) {}
    func sceneDidEnterBackground(_ scene: UIScene) {}
}
