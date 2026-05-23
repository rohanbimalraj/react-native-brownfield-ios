# This Podfile is only used for the brownfield native app.
# Set RN_TARGET so react-native.config.js points sourceDir to this directory.
ENV['RN_TARGET'] = 'native'

# ⚠️ Replace 'BrownfieldRN' with the name of your React Native project folder
rn_dir = File.join(__dir__, 'BrownfieldRN')

require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
    "react-native/scripts/react_native_pods.rb",
    {paths: [process.argv[1]]},
  )', rn_dir]).strip

platform :ios, min_ios_version_supported
prepare_react_native_project!

linkage = ENV['USE_FRAMEWORKS']
if linkage != nil
  Pod::UI.puts "Configuring Pod with #{linkage}ally linked Frameworks".green
  use_frameworks! :linkage => linkage.to_sym
end

# ⚠️ Replace 'BrownfieldHost' with your iOS app's target name
target 'BrownfieldHost' do
  # Run the RN CLI config from the BrownfieldRN directory so it discovers
  # the RN project's package.json and node_modules.
  config = use_native_modules!(['node', '-e',
    "const cli = require.resolve('@react-native-community/cli', " \
    "  {paths: ['#{rn_dir}']});" \
    "process.chdir('#{rn_dir}');" \
    "process.argv=['', '', 'config'];" \
    "require(cli).run()"
  ])

  use_react_native!(
    :path => config[:reactNativePath],
    :app_path => rn_dir
  )

  post_install do |installer|
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
    )

    installer.aggregate_targets.each do |aggregate_target|
      aggregate_target.user_project.targets.each do |target|
        target.build_configurations.each do |config|
          other_flags = config.build_settings['OTHER_LDFLAGS'] || '$(inherited)'
          unless other_flags.include?('-lc++')
            config.build_settings['OTHER_LDFLAGS'] = "#{other_flags} -lc++"
          end
        end
      end
      aggregate_target.user_project.save
    end
  end
end
