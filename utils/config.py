#!/usr/bin/env python
from boto import Config as BotoConfig
from boto.s3.key import Key
import argparse
import boto

class AwsConfig(BotoConfig):
    """
        Extend BotoConfig.get() to look up environment variables

        @param section str
        @param name str
        @param default str
        @see BotoConfig.get()
        @return string
    """
    def expand_get(self, section, name, default=None):
        val = self.get(section, name, default)

        if not val:
           name = name.upper()
           val = os.getenv(name)

           if not val:
              raise EnvironmentError('Set %s in env or ~/.boto or /etc/boto' % name)

        return val

class ConfigManager():
    """
    Simple build script to manage build process
    """
    def __init__(self):
        aws_config = AwsConfig()
        aws_key     = aws_config.expand_get('Credentials', 'aws_access_key_id')
        aws_secret  = aws_config.expand_get('Credentials', 'aws_secret_access_key')
        self.s3 = boto.connect_s3(aws_key, aws_secret)

    def download_config(self):
        """
            Download latst version of config.json
        """
        bucket = self.s3.get_bucket('screeneasy')
        k = Key(bucket)
        k.key = 'config/latest/config.json'
        content = k.get_contents_as_string()

        with open('/tmp/config.json', 'w') as config_writer:
            config_writer.write(content)
            print "downloaded config to /tmp/config.json"

    def upload_config(self, config_file):
        """
        Upload to s3 with the following formats:
            s3://screeneasy/config/latest/config.json
            s3://screeneasy/config/date/config.json

        e.g:
            s3://screeneasy/config/latest/config.json
            s3://screeneasy/config/2013-09-11T21:52:34.412464/config.json

        Args:
            config_file string - config file path
        """
        import datetime
        utc = datetime.datetime.utcnow()

        bucket = self.s3.get_bucket('screeneasy')

        k = Key(bucket)

        # Overrides latest build
        k.key = 'config/latest/config.json'
        k.set_contents_from_filename(config_file)
        print "uploaded to s3://screeneasy/config/latest/config.json"

        # Upload a copy for archiving purpose
        key_name = 'config/%s/config.json' % utc.strftime("%Y-%m-%d")
        k.key = key_name
        k.set_contents_from_filename(config_file)
        print "uploaded to s3://screeneasy/%s/config.json" % key_name

if __name__ == '__main__':
    def parse_arg_options():
        """
        Parse command line argument
        """
        parser = argparse.ArgumentParser()
        parser.add_argument('-u', '--download', help='download latest config from s3', dest='upload_config', action='store_true')
        parser.add_argument('-d', '--upload', help='upload a config file to s3', dest='download_config', action='store_true')
        parser.add_argument('-c', '--config-file', help='config file location', dest='config_file', default='/tmp/config.json')

        return parser.parse_args()

    args = parse_arg_options()

    config = ConfigManager()

    if args.upload_config:
        config.upload_config(args.config_file)

    if args.download_config:
        config.download_config()
