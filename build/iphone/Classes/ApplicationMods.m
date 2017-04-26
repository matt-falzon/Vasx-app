#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"keychain",@"name",@"com.obscure.keychain",@"moduleid",@"1.0",@"version",@"acf8434d-5290-4b73-8f39-e4cd7349860a",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end