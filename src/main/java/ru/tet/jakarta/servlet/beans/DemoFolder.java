package ru.tet.jakarta.servlet.beans;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class DemoFolder {

	String name;
	
	List<String> pages;
	
}
