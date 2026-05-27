//
//  RCTNativeUserModule.mm
//  BrownfieldHost
//

#import <Foundation/Foundation.h>
#import <ReactCodegen/BrownfieldRNSpec/BrownfieldRNSpec.h>
#import "BrownfieldHost-Swift.h"

@interface RCTNativeUserModule : NativeUserModuleSpecBase <NativeUserModuleSpec>
@end

@implementation RCTNativeUserModule

+ (NSString *)moduleName {
    return @"NativeUserModule";
}

- (instancetype)init {
    if (self = [super init]) {
        __weak RCTNativeUserModule *weakSelf = self;
        [UserNativeService shared].emit = ^(NSDictionary *payload) {
            RCTNativeUserModule *strongSelf = weakSelf;
            if (strongSelf && strongSelf->_eventEmitterCallback) {
                [strongSelf emitOnNativeEvent:payload];
            }
        };
    }
    return self;
}

- (void)dealloc {
    [UserNativeService shared].emit = nil;
}

- (NSString *)getPhoneNumber {
    return [[UserNativeService shared] getPhoneNumber];
}

- (void)getDeviceId:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
    [[UserNativeService shared] getDeviceIdWithCompletion:^(NSString *deviceId) {
        resolve(deviceId);
    }];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeUserModuleSpecJSI>(params);
}

@end
