#!/usr/bin/perl
use strict;
use warnings;
use POSIX qw(strftime);

# Print the "Hello ASL" string
print "Hello ASL!\n";

# Get and print the current date
my $date = strftime "%Y-%m-%d", localtime;

print "$date\n";